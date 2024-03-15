"use strict";

require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    const deleteTable = await sql`DROP TABLE IF EXISTS profiles`;

    try {
        await sql`DROP TYPE IF EXISTS penghasilan_perbulan_enum`;
        await sql`DROP TYPE IF EXISTS status_ortu_enum`;
        await sql`DROP TYPE IF EXISTS jenis_profile_enum`;
        await sql`DROP TYPE IF EXISTS status_siswa_enum`;
        await sql`DROP TYPE IF EXISTS kelamin_enum`;

        const createEnum1 =
            await sql`CREATE TYPE penghasilan_perbulan_enum AS ENUM('Kurang dari 1juta', '1-2 juta', '2-3 juta', '3-5 juta', '5-10 juta', 'Lebih dari 10 juta');`;

        const createEnum2 =
            await sql`CREATE TYPE status_ortu_enum AS ENUM('Hidup', 'Meninggal');`;

        const createEnum3 =
            await sql`CREATE TYPE jenis_profile_enum AS ENUM('calon_siswa', 'siswa', 'pengajar', 'admin');`;

        const createEnum4 =
            await sql`CREATE TYPE status_siswa_enum AS ENUM('menunggu', 'test', 'tidak_diterima', 'diterima');`;

        const createEnum5 =
            await sql`CREATE TYPE kelamin_enum AS ENUM('laki-laki', 'perempuan');`;
    } catch (err) {
        console.log("error enum: ", err);
        console.log("enum sudah ada");
    }

    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS pengeluaran (
        id SERIAL PRIMARY KEY,
        nama_item VARCHAR(255) NOT NULL,
        jumlah_item INT NOT NULL,
        jumlah_harga INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        tanggal_input TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )    
    `;
    console.log(`Created "profiles" table `, createTable);
    return {
        createTable, // users,
    };
}

execute();
