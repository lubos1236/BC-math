type Variable = {
    name: string;
    type: string;
    precision: number;
    min: number;
    max: number;
    count?: number;
}

export interface Hint {
    id: number;
    hint: string;
}

export interface Assignment {
    id: number
    subject_id: number
    task: string
    variables: string
    solution: string
    generatedValues?: { [key: string]: number | number[] };
    submittedSolution: string;
    hints: Hint[];
}

function arrayProcess(variableString: string): { count: number, innerVariableString: string } {
    const regex = /{([a-zA-Z]+):(\d+)\{([^{}]+)\}}/;
    const match = regex.exec(variableString);
    if (!match) {
        throw new Error(`Invalid array variable string: ${variableString}`);
    }
    const count = parseInt(match[2], 10);
    const innerVariableString = '{' + match[3] + '}';
    return {count, innerVariableString};
}

function generateRandomNumber(spec: Variable): number {
    let value: number;
    switch (spec.type) {
        case 'd':
            value = Math.floor(Math.random() * (spec.max - spec.min + 1)) + spec.min;
            break;
        case 'f':
            value = parseFloat((Math.random() * (spec.max - spec.min) + spec.min).toFixed(spec.precision));
            break;
        default:
            throw new Error(`Invalid type: ${spec.type}`);
    }
    return value;
}

function replaceText(text: string, values: { [key: string]: number | number[] }): string {
    let newText = text;
    for (const [key, value] of Object.entries(values)) {
        const placeholder = new RegExp(`{%${key}%}`, 'g');
        if (Array.isArray(value)) {
            const joinedValue = value.join(', ');
            newText = newText.replace(placeholder, joinedValue);
        } else {
            newText = newText.replace(placeholder, String(value));
        }
    }
    return newText;
}

function processOne(assignment: Assignment): Assignment {
    const regex = /{([^,]+),(\w+)(?:\.(\d+))?,(\d+),(\d+)}/g;
    const variables: Variable[] = [];
    let match;
    const variableStrings: string[] = assignment.variables.split(";").map(assignment => assignment.trim());
    variableStrings.forEach((variableString) => {
        regex.lastIndex = 0;

        if (variableString.startsWith("{a")) {
            const arrayInfo = arrayProcess(variableString);
            if (arrayInfo) {
                const count = arrayInfo.count;
                const innerVariableString = arrayInfo.innerVariableString;
                match = regex.exec(innerVariableString);
                if (match) {
                    const [, name, type, precision = '2', min, max,] = match;
                    variables.push({
                        name,
                        type,
                        precision: parseInt(precision),
                        min: parseInt(min, 10),
                        max: parseInt(max, 10),
                        count
                    });
                }
            }
        } else {
            match = regex.exec(variableString);
            if (match) {
                const [, name, type, precision = '2', min, max,] = match;
                variables.push({
                    name,
                    type,
                    precision: parseInt(precision),
                    min: parseInt(min, 10),
                    max: parseInt(max, 10)
                });
            }
        }
    });
    const generatedValues: { [key: string]: number | number[] } = {};
    variables.forEach((variable) => {
        if (variable.count) {
            generatedValues[variable.name] = Array.from({length: variable.count}, () =>
                generateRandomNumber(variable)
            );
        } else
            generatedValues[variable.name] = generateRandomNumber(variable);
    });

    const solutions = assignment.solution.split(";");
    const generatedSolutions: string[] = solutions.map(solution => {
        return replaceText(solution, generatedValues);
    });
    const generatedTask = replaceText(assignment.task, generatedValues);
    assignment.task = generatedTask;

    assignment.generatedValues = generatedValues;
    assignment.solution = generatedSolutions.join(";");
    return assignment;
}

export function processAssignments(assignments: Assignment[]): Assignment[] {
    return assignments.map(processOne);
}

function computeVariance(numbers: number[]): number {
    const n = numbers.length;
    const mean = numbers.reduce((sum, value) => sum + value, 0) / n;
    const variance = numbers.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / n;
    return variance;
}

export function checkSolution(assignment: Assignment, result: string, showResult: boolean = false): boolean | string {
    const solutions = assignment.solution.split(";");
    const userResults = result.split(";").map(s => s.trim());

    let match;

    const allSolutions: number[] = [];

    for (const solution of solutions) {
        let newSolution = replaceText(solution, assignment.generatedValues!);

        // Rozptyl
        const regexVariance = /var\(([^)]+)\)/g;
        while ((match = regexVariance.exec(newSolution)) !== null) {
            const numbers = match[1].split(',').map(Number);
            const varianceValue = computeVariance(numbers);
            newSolution = newSolution.replace(match[0], varianceValue.toString());
        }

        // mod()
        const regexMod = /mod\(([^)]+)\)/g;
        while ((match = regexMod.exec(newSolution)) !== null) {
            const numbers = match[1].split(',').map(Number);
            const modes = computeMode(numbers);
            newSolution = newSolution.replace(match[0], modes.toString());
        }

        // med()
        const regexMedian = /med\(([^)]+)\)/g;
        while ((match = regexMedian.exec(newSolution)) !== null) {
            const numbers = match[1].split(",").map(Number);
            const medianValue = computeMedian(numbers);
            newSolution = newSolution.replace(match[0], medianValue.toString());
        }

        allSolutions.push(eval(newSolution));
    }

    const combinedSolution = allSolutions.join(";");

    if (showResult) {
        return combinedSolution;
    }

    if (userResults.length !== allSolutions.length) return false;

    for (let i = 0; i < allSolutions.length; i++) {
        const userValue = parseUserValue(userResults[i]);
        const expected = allSolutions[i];

        if (isNaN(userValue)) {
            console.log('Invalid number:', userResults[i]);
            return false;
        }

        if (Math.abs(userValue - expected) > 1e-6) {
            console.log(false);
            return false;
        }
    }

    console.log(true);
    return true;
}

function parseUserValue(value: string): number {
    value = value.trim().replace(',', '.'); // podporuje 0,5 → 0.5

    if (value === "") {
        return NaN;
    }

    if (value.includes("/")) {
        const [numerator, denominator] = value.split("/").map(part => part.trim());

        if (!isNaN(parseFloat(numerator)) && !isNaN(parseFloat(denominator)) && parseFloat(denominator) !== 0) {
            return parseFloat(numerator) / parseFloat(denominator);
        } else {
            console.log('Invalid fraction format:', value);
            return NaN;
        }
    }

    const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
    if (!regex.test(value)) {
        console.log('Invalid number format:', value);
        return NaN;
    }

    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
        return parsed;
    }

    return NaN;
}

function computeMode(numbers: number[]) {
    const frequency: Record<number, number> = {};
    let maxFrequency = 0;
    const modes = [];

    numbers.forEach(number => {
        frequency[number] = (frequency[number] || 0) + 1;
        if (frequency[number] > maxFrequency) {
            maxFrequency = frequency[number];
        }
    });

    for (const number in frequency) {
        if (frequency[number] === maxFrequency) {
            modes.push(parseFloat(number));
        }
    }

    return modes;
}

function computeMedian(numbers: number[]) {
    numbers.sort((a, b) => a - b);
    const middle = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 0) {
        return (numbers[middle - 1] + numbers[middle]) / 2;
    }
    return numbers[middle];
}

export function processAnswers(themes: number[], ans: boolean[], count: number): { theme: number, r_count: number, w_count: number }[] {
    const t = themes.map((theme, index) => {
        const start = index * count;
        const end = start + count;
        const answers = ans.slice(start, end);

        return {
            theme: theme,
            r_count: answers.filter(ans => ans).length,
            w_count: answers.filter(ans => !ans).length
        };
    });
    return t;
}
