AStar = function (startPoint, endPoint, mapArray) {
        getDistance = function (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        };
        copyPath = function (path) {
            let copy = [];
            for (var n = 0; n < path.length; n++) {
                copy[n] = path[n];
            }
            return copy;
        };
        let width = 0;
        let height = mapArray.length;
        mapArray.forEach((x) => {
            width = Math.max(width, x.length);
        }
        );
        mapArray = mapArray.map((row) => {
            return row.map((colunm) => {
                if (colunm > 0) {
                    return Infinity;
                } else {
                    return 0;
                }
            }
            );
        }
        );
        let queue = [[startPoint]];
        let tempQueu;
        let tempPath;
        let minF = Infinity;
        while (queue.length > 0) {
            tempQueue = [];
            queue.forEach((path) => {
                let lastX = path[path.length - 1][0];
                let lastY = path[path.length - 1][1];
                if (minF >= path.length + getDistance(lastX, lastY, endPoint[0], endPoint[1]) + mapArray[lastY][lastX]) {
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (lastX + x < 0 || lastX + x >= width || lastY + y < 0 || lastY + y >= height) {
                                continue;
                            }
                            tempPath = copyPath(path);
                            tempPath.push([lastX + x, lastY + y]);
                            tempQueue.push(tempPath);
                        }
                    }
                }
            }
            );
            queue = tempQueue.filter((path) => {
                for (let i = 0; i < path.length - 1; i++) {
                    for (let n = i + 1; n < path.length; n++) {
                        if (path[i][0] == path[n][0] && path[i][1] == path[n][1]) {
                            return false;
                        }
                    }
                }
                return true;
            }
            );
            minF = Infinity;
            for (let n = 0; n < queue.length; n++) {
                let path = queue[n];
                let lastX = path[path.length - 1][0];
                let lastY = path[path.length - 1][1];
                if (lastX == endPoint[0] && lastY == endPoint[1]) {
                    return path;
                }
                minF = Math.min(minF, path.length + getDistance(lastX, lastY, endPoint[0], endPoint[1]) + mapArray[lastY][lastX]);
            }
        }
        return [];
    };
    pathFind = function (map, start, end) {
        map = map.split("\n").map(x => x.split(""));
        map = map.map(x => x.map(x => x == "■"));
        let astar = AStar(start, end, map);
        map = map.map(x => x.map(x => x ? "⬛" : "⬜"));
        astar.forEach(x => map[x[1]][x[0]] = "🏻");
        map = map.map(x => x.join("")).join("\n");
        return map;
    }
