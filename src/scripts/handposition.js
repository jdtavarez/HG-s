class Handposition {

    constructor(results) {
        this.positions = results.multiHandLandmarks[0];
        this.handed = results.multiHandedness[0].label === 'Right' ? 'Left' : 'Right'
        this.axis = this.handAxisXYZ();
        this.fingers = {
            firstOpen: undefined,
            secondOpen: undefined,
            thirdOpen: undefined,
            fourthOpen: undefined
        };
        this.fingersIsOpen();
        this.pose = this.pose();
    };

    // hand position will determine conditions for evaulating overall pose
    handAxisXYZ() {
        const palmBase = this.positions[0];
        const secondKnuckle = this.positions[9];

        let dist = new Map();
        dist.set(Math.abs(palmBase.x - secondKnuckle.x), 'x');
        dist.set(Math.abs(palmBase.y - secondKnuckle.y), 'y');
        dist.set(Math.abs(palmBase.z - secondKnuckle.z), 'z');

        const distArray = Array.from(dist.keys());
        const maxDist = Math.max(...distArray);

        return dist.get(maxDist);
    };

    fingersIsOpen() {
        const ctx = this;
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


        fingers.forEach((e, i) => {
            const position = e[a][`${ctx.axis}`] < e[b][`${ctx.axis}`];
            if (i === 0) {
                ctx.fingers['firstOpen'] = position;
            } else if (i === 1) {
                ctx.fingers['secondOpen'] = position;
            } else if (i === 2) {
                ctx.fingers['thirdOpen'] = position;
            } else {
                ctx.fingers['fourthOpen'] = position;
            }
        })
    };

    pose() {
        if (this.fingers['firstOpen']
            && this.fingers['secondOpen']
            && this.fingers['thirdOpen']
            && this.fingers['fourthOpen']) {
            return 'paper';
        } else if (this.fingers['firstOpen']
            && this.fingers['secondOpen']
            && !this.fingers['thirdOpen']
            && !this.fingers['fourthOpen']) {
            return 'scissors';
        } else if (!this.fingers['firstOpen']
            && !this.fingers['secondOpen']
            && !this.fingers['thirdOpen']
            && !this.fingers['fourthOpen']) {
            return 'rock';
        } else {
            return 'unsure';
        }
    };
};

export default { Handposition };