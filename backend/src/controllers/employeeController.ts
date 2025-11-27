import prisma from '../lib/prisma.js';
import type { Request, Response } from 'express';
import fs from 'fs';
import csv from 'csv-parser';

export const importEmployees = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const results: any[] = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                let count = 0;
                let currentToken = await prisma.employee.count();

                for (const row of results) {
                    currentToken++;

                    await prisma.employee.create({
                        data: {
                            name: row.Name || row.name,
                            department: row.Department || row.department,
                            phone: row.Phone || row.phone,
                            tokenNumber: currentToken.toString(),
                            status: 'NOT_WON'
                        }
                    });
                    count++;
                }

                fs.unlinkSync(req.file!.path);
                res.json({ message: `Imported ${count} employees` });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error importing employees' });
            }
        });
};

export const getEmployees = async (req: Request, res: Response) => {
    const employees = await prisma.employee.findMany();
    res.json(employees);
};
