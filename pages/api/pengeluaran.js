import db from "../../utils/database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {
            nama_item,
            jumlah_item,
            jumlah_harga_item,
            tanggal_input,
            status,
        } = req.body;
        await db.query(
            "INSERT INTO pengeluaran (nama_item, jumlah_item, jumlah_harga_item, tanggal_input, status) VALUES ($1, $2, $3, $4, $5)",
            [nama_item, jumlah_item, jumlah_harga_item, tanggal_input, status]
        );
        res.status(201).json({ message: "Data berhasil disimpan" });
    } else if (req.method === "GET") {
        const response = await db.query("SELECT * FROM pengeluaran");
        const data = response.rows;
        res.status(200).json(data);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
