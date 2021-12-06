class Handpose {
    constructor(results) {
        this.positions = results.multiHandLandmarks[0];
        this.handed = results.multiHandedness[0].label === 'Right' ? 'Right' : 'Left'
        this.orientation = this.horizontalVertical();
        // this.indexOpen = undefined;
        // this.middleOpen = undefined;
        // this.ringOpen = undefined;
        // this.pinkyOpen = undefined;
        this.outOrIn();
        this.pose = undefined;
    };

    // hand position will determine conditions for evaulating overall pose
    horizontalVertical () {
        const knuckleIndex = this.positions[5].y;
        const knuckleMiddle = this.positions[9].y;
        const knuckleRing = this.positions[13].y;
        const knucklePinky = this.positions[17].y;

        const knuckleHeights = knuckleIndex + knuckleMiddle + knuckleRing + knucklePinky

        // if knuckleHeights/knucklePinky ~= 4, then the knuckles are at the same y coordinate 
        const constraint = knuckleHeights/knucklePinky
        if (Math.round(constraint) === 4) {
            this.axis = 'y';
            return 'vertical'
        } else {
            this.axis = 'x';
            return 'horizontal'
        }
    };

    isOpen () {
        const index = this.positions.slice(5, 9);
        const middle = this.positions.slice(9, 13);
        const ring = this.positions.slice(13, 17);
        const pinky = this.positions.slice(17, 21);
        const fingers = [index, middle, ring, pinky];
        let fingerPositions = [this.indexOpen, this.middleOpen, this.ringOpen, this.pinkyOpen];

        let a;
        let b;

        if (this.handed === 'Left' && this.axis === 'x') {
            [a, b] = [1, 3]
        } else {
            [a, b] = [3, 1]
        }

        fingers.forEach((e, i) => {
            let open = e[a][`${this.axis}`] > e[b][`${this.axis}`];
            fingerPositions[i] = open;
        })
    };

};