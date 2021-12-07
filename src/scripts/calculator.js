class Calculator {
    static createVectors(p1, p2, p3) {
        const vectorXY = [
            p2.x - p1.x,
            p2.y - p1.y,
            p2.z - p1.z
        ];

        const vectorYZ = [
            p2.x - p3.x,
            p2.y - p3.y,
            p2.z - p3.z
        ];

        return [vectorXY, vectorYZ];
    };

    static distance(vector) {
        const coordinates =
            (vector[0] ** 2) +
            (vector[1] ** 2) +
            (vector[2] ** 2);
        const distance = Math.sqrt(coordinates)
        return distance;
    };

    static magnitudes(vectors) {
        return Calculator.distance(vectors[0])
            * Calculator.distance(vectors[1]);
    };

    static dotProduct(vectors) {
        let product = 0;
        let productVector = [];
        let i;
        for (i = 0; i < vectors[0].length; i++) {
            productVector.push(vectors[0][i] * vectors[1][i]);
        }

        const reducer = (acc, el) => acc + el;
        product = productVector.reduce(reducer);

        return product;
    };

    static angle(p1, p2, p3) {
        const vectors = Calculator.createVectors(p1, p2, p3);
        const dotProduct = Calculator.dotProduct(vectors);
        const magnitude = Calculator.magnitudes(vectors);
        const angle = Math.acos(dotProduct / magnitude);

        return angle;
    };
}

export { Calculator }