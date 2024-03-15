"use strict";

require("dotenv").config({ path: ".env.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
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
