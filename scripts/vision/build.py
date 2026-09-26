import json, numpy as np, os
d = json.load(open('raw.json'))
ZONE_X = 0.84  # conveyor lane on the right edge of the frame
tracks = {}
for f in d['frames']:
    for t in f: tracks.setdefault(t[0], []).append(t)
keep = {k: v for k, v in tracks.items() if len(v) >= 4}
state = {}
for k, v in keep.items():
    h = float(np.median([t[4] for t in v]))
    cx = float(np.median([t[1] + t[3] / 2 for t in v]))
    p75 = float(np.percentile([t[6] for t in v], 75))
    if h < 0.12 or cx >= ZONE_X: state[k] = 0   # too far or at the frame edge to judge
    elif p75 >= 0.12: state[k] = 1               # hi-vis vest detected
    elif len(v) >= 20: state[k] = 2              # close, tracked long, no vest visible
    else: state[k] = 0
order = []
for f in d['frames']:
    for t in f:
        if t[0] in keep and t[0] not in order: order.append(t[0])
label = {k: i + 1 for i, k in enumerate(order)}
frames, events, flagged, last_zone = [], [], set(), -99
prev_in = 0
for fi, f in enumerate(d['frames']):
    row, n_in = [], 0
    t_s = round(fi / d['fps'], 2)
    for tid, x, y, w, h, c, v in f:
        if tid not in keep: continue
        L = label[tid]
        row.append([L, round(x, 4), round(y, 4), round(w, 4), round(h, 4), round(c, 2), state[tid]])
        if x + w / 2 >= ZONE_X: n_in += 1
        if state[tid] == 2 and L not in flagged:
            flagged.add(L); events.append([t_s, 'novest', L])
    # log a zone entry when occupancy rises, at most once every 4 s
    if n_in > prev_in and t_s - last_zone >= 4:
        events.append([t_s, 'zone', n_in]); last_zone = t_s
    prev_in = n_in
    frames.append(row)
events.sort()
json.dump({'fps': d['fps'], 'zoneX': ZONE_X, 'frames': frames, 'events': events}, open('vision-detections.json', 'w'), separators=(',', ':'))
print('bytes', os.path.getsize('vision-detections.json'), 'states', {s: sum(1 for k in keep if state[k] == s) for s in (0, 1, 2)})
print(events)
