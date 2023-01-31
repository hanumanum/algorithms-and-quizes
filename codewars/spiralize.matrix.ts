const spiralize = (size: number): number[][] => {
    if (size < 5){
        console.error("size must be greater than 4")
        return []
    } 
    
    let dir = "→";

    const matrix = Array(size).fill(0).map(() => Array(size).fill(0));

    const countNeighbors = (y: number, x: number) => {
        let sum = 0;
        if (matrix[y - 1]) sum += matrix[y - 1][x - 1] + matrix[y - 1][x] + matrix[y - 1][x + 1]
        sum += matrix[y][x - 1] + matrix[y][x] + matrix[y][x + 1]
        if (matrix[y + 1]) sum += matrix[y + 1][x - 1] + matrix[y + 1][x] + matrix[y + 1][x + 1]
        return isNaN(sum) ? 0 : sum
    }

    const processNextCell = (y: number, x: number) => {
        matrix[y][x] = 1;

        if (dir === "→" && (x + 1 === size || (matrix[y][x + 1] === 0 && matrix[y][x + 2] === 1))) {
            dir = "↓"
        }
        else if (dir === "↓" && (y + 1 === size || (matrix[y + 1][x] === 0 && matrix[y + 2] && matrix[y + 2][x] === 1))) {
            dir = "←"
        }
        else if (dir === "←" && (x === 0 || (matrix[y][x - 1] === 0 && matrix[y][x - 2] === 1))) {
            dir = "↑"
        }
        else if (dir === "↑" && (y === 0 || (matrix[y - 1][x] === 0 && matrix[y - 2] && matrix[y - 2][x] === 1))) {
            dir = "→"
        }


        if (dir === "→") x++
        if (dir === "←") x--
        if (dir === "↓") y++
        if (dir === "↑") y--

        countNeighbors(y,x)<3 && processNextCell(y, x)

    }

    processNextCell(0, 0)
    return matrix;
}


//Tests 
const spir4 = spiralize(4)
const spir5 = spiralize(5)
const spir6 = spiralize(6)
const spir7 = spiralize(7)
const spir8 = spiralize(8)

console.table(spir4)
console.table(spir5)
console.table(spir6)
console.table(spir7)
console.table(spir8)