class Handposition {

    constructor(results) {
        this.positions = results.multiHandLandmarks[0];
        this.handed = results.multiHandedness[0].label === 'Right' ? 'Left' : 'Right'
        this.orientation = this.horizontalVertical();
        this.fingers = {
            firstOpen: undefined,
            secondOpen: undefined,
            thirdOpen: undefined,
            fourthOpen: undefined
        };
        this.isOpen();
        this.pose = undefined;
    };

    // hand position will determine conditions for evaulating overall pose
    horizontalVertical() {
        const firstKnuckleHeight = this.positions[5].y;
        const secondKnuckleHeight = this.positions[9].y;
        const thirdKnuckleHeight = this.positions[13].y;
        const fourthKnuckleHeight = this.positions[17].y;

        const knuckleHeights = firstKnuckleHeight + secondKnuckleHeight + thirdKnuckleHeight + fourthKnuckleHeight

        // if knuckleHeights/fourthKnuckleHeight ~= 4, then the knuckles are at the same y coordinate 
        const constraint = knuckleHeights / fourthKnuckleHeight
        if (Math.round(constraint) === 4) {
            this.axis = 'y';
            return 'vertical'
        } else {
            this.axis = 'x';
            return 'horizontal'
        }
    };

    isOpen() {
        const first = this.positions.slice(5, 9);
        const second = this.positions.slice(9, 13);
        const third = this.positions.slice(13, 17);
        const fourth = this.positions.slice(17, 21);

        const fingers = [first, second, third, fourth];

        let a;
        let b;

        if (this.handed === 'Left' && this.axis === 'x') {
            [a, b] = [1, 3]
        } else {
            [a, b] = [3, 1]
        }

        let ctx = this
        debugger

        fingers.forEach((e, i) => {
            const position = e[a][`${ctx.axis}`] < e[b][`${ctx.axis}`];
            debugger;
            switch (e) {
                case (i === 0): {
                    ctx.fingers['firstOpen'] = position;
                    debugger;
                }
                case (i === 1): {
                    ctx.fingers['secondOpen'] = position;
                    debugger;
                }
                case (i === 2): {
                    ctx.fingers['thirdOpen'] = position;
                    debugger;
                }
                case (i === 3): {
                    ctx.fingers['fourthOpen'] = position;
                    debugger;
                }
            };
        })
    };

};

export default { Handposition };