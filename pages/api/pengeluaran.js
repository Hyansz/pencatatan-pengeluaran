// pages/api/pengeluaran.js
import { pool } from '../../utils/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { namaItem, jumlahItem, jumlahHarga, status } = req.body;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const result = await client.query(
                'INSERT INTO pengeluaran (nama_item, jumlah_item, jumlah_harga, status) VALUES ($1, $2, $3, $4) RETURNING *',
                [namaItem, jumlahItem, jumlahHarga, status]
            );
            await client.query('COMMIT');
            res.status(201).json(result.rows[0]);
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
            client.release();
        }
    } else if (req.method === 'GET') {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM pengeluaran');
            res.status(200).json(result.rows);
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
            client.release();
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
