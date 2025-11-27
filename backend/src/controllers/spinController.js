const { PrismaClient } = require('../../.prisma/client');
const prisma = new PrismaClient();

const startSpin = async (req, res) => {
    try {
        const count = await prisma.employee.count({ where: { status: 'NOT_WON' } });

        if (count === 0) {
            return res.status(400).json({ error: 'No eligible employees left' });
        }

        const skip = Math.floor(Math.random() * count);
        const winner = await prisma.employee.findFirst({
            where: { status: 'NOT_WON' },
            skip: skip
        });

        await prisma.employee.update({
            where: { id: winner.id },
            data: {
                status: 'WON',
                wonAt: new Date()
            }
        });

        await prisma.spinLog.create({
            data: {
                employeeId: winner.id
            }
        });

        req.io.emit('spin-result', winner);

        res.json({ success: true, winner });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Spin failed' });
    }
};

module.exports = { startSpin };
