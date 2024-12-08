const {Prisma} = require("@prisma/client");

exports.parsePrismaError = (err) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                const fields = err.meta.target.join(', ');
                return `Duplicate entry for ${fields}`;
            case 'P2003':
                return 'Please correct the provided key combination'
            case 'P2025':
                return 'The data to be updated cannot be found'
            default:
                return 'Unlisted known error';
        }
    }
}