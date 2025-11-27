const prisma = require('../lib/prisma');
const fs = require('fs');
const csv = require('csv-parser');

const importEmployees = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                let count = 0;
                let errors = [];

                for (const row of results) {
                    // Support both camelCase and lowercase
                    const tokenNumber = row.tokenNumber || row.tokennumber || row.TokenNumber;
                    const name = row.name || row.Name;
                    const department = row.department || row.Department;
                    const phone = row.phone || row.Phone;

                    // Validate required fields
                    if (!tokenNumber || !name) {
                        errors.push(`Row skipped - missing required fields: ${JSON.stringify(row)}`);
                        continue;
                    }

                    try {
                        // Check if token already exists
                        const existing = await prisma.employee.findUnique({
                            where: { tokenNumber: tokenNumber.toString() }
                        });

                        if (existing) {
                            errors.push(`Token ${tokenNumber} already exists`);
                            continue;
                        }

                        await prisma.employee.create({
                            data: {
                                tokenNumber: tokenNumber.toString(),
                                name: name,
                                department: department || null,
                                phone: phone || null,
                                status: 'NOT_WON'
                            }
                        });
                        count++;
                    } catch (error) {
                        console.error('Error creating employee:', error);
                        errors.push(`Error importing ${name}: ${error.message}`);
                    }
                }

                // Clean up uploaded file
                fs.unlinkSync(req.file.path);

                const response = {
                    message: `Successfully imported ${count} employees`,
                    count: count,
                    errors: errors.length > 0 ? errors : undefined
                };

                res.json(response);
            } catch (error) {
                console.error('Error importing employees:', error);
                res.status(500).json({ error: 'Error importing employees: ' + error.message });
            }
        })
        .on('error', (error) => {
            console.error('CSV parsing error:', error);
            res.status(500).json({ error: 'Error parsing CSV file: ' + error.message });
        });
};

const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: {
                tokenNumber: 'asc'
            }
        });
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees: ' + error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.employee.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Error deleting employee: ' + error.message });
    }
};

const deleteAllEmployees = async (req, res) => {
    try {
        await prisma.employee.deleteMany();
        res.json({ message: 'All employees deleted successfully' });
    } catch (error) {
        console.error('Error deleting all employees:', error);
        res.status(500).json({ error: 'Error deleting employees: ' + error.message });
    }
};

module.exports = { importEmployees, getEmployees, deleteEmployee, deleteAllEmployees };
