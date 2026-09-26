import json, cv2, numpy as np
from ultralytics import YOLO

model = YOLO('yolo11x.pt')
cap = cv2.VideoCapture('src.mp4')
fps = cap.get(cv2.CAP_PROP_FPS); W = int(cap.get(3)); H = int(cap.get(4))
frames = []
i = 0
while True:
    ok, frame = cap.read()
    if not ok: break
    r = model.track(frame, persist=True, classes=[0], imgsz=1920, conf=0.15, device='mps', tracker='bytetrack.yaml', verbose=False)[0]
    dets = []
    if r.boxes.id is not None:
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        for (x1, y1, x2, y2), tid, c in zip(r.boxes.xyxy.cpu().numpy(), r.boxes.id.int().cpu().numpy(), r.boxes.conf.cpu().numpy()):
            # torso band: 20-65% of box height, middle 70% of width
            h = y2 - y1; w = x2 - x1
            ty1, ty2 = int(y1 + h * .2), int(y1 + h * .65); tx1, tx2 = int(x1 + w * .15), int(x2 - w * .15)
            roi = hsv[max(ty1,0):max(ty2,ty1+1), max(tx1,0):max(tx2,tx1+1)]
            # hi-vis orange / yellow-green: saturated, bright, hue 5-40 (OpenCV 0-180)
            m = (((roi[..., 0] >= 5) & (roi[..., 0] <= 50)) & (roi[..., 1] > 120) & (roi[..., 2] > 120))
            vest = float(m.mean()) if m.size else 0.0
            dets.append([int(tid), round(float(x1) / W, 4), round(float(y1) / H, 4), round(float(w) / W, 4), round(float(h) / H, 4), round(float(c), 2), round(vest, 3)])
    frames.append(dets); i += 1
json.dump({'fps': fps, 'w': W, 'h': H, 'frames': frames}, open('raw.json', 'w'))
ids = {}
for f in frames:
    for d in f: ids.setdefault(d[0], []).append(d[6])
print('frames', len(frames), 'fps', fps)
for k, v in sorted(ids.items()): print(k, 'n', len(v), 'vest median', round(float(np.median(v)), 3))
