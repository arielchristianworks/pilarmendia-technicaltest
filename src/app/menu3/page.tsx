"use client"

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { useRef, useState, useEffect } from "react"
import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";

import MainLayout from "../MainLayout";
import { MyScrollToRef } from "@/utils/MyScrollToRef";
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Menu3Page() {
  const nomor1Ref = useRef<HTMLDivElement>(null);
  const nomor2Ref = useRef<HTMLDivElement>(null);
  const nomor3Ref = useRef<HTMLDivElement>(null);

  const sideNav = [
    { label: "Nomor 1", onClick: () => MyScrollToRef(nomor1Ref) },
    { label: "Nomor 2", onClick: () => MyScrollToRef(nomor2Ref) },
    { label: "Nomor 3", onClick: () => MyScrollToRef(nomor3Ref) },
  ]

  const [dataBar1, setDataBar1] = useState<{labels: string[], values: number[]}>();
  const [dataBar2, setDataBar2] = useState<{labels: string[], values: number[]}>();

  useEffect(() => {
    const fetchBar1 = async () => {
      await axios.get(`http://localhost:3000/api/reports/per-year?year=2023`)
      .then((res) => {
        setDataBar1(res.data)
      })
    }
    const fetchBar2 = async () => {
      await axios.get(`http://localhost:3000/api/reports/per-year?year=2022`)
      .then((res) => {
        setDataBar2(res.data)
      })
    }

    fetchBar1();
    fetchBar2();
  }, []);

  return (
    <MainLayout appBarTitle="Menu Soal 3: Query Dashboard">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box sx={{ px: 2 }}>
            <Typography ref={nomor1Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>1. Bagaimana Anda akan mengoptimalkan query SQL untuk mengambil data dari tabel yang memiliki jutaan baris?</Typography>
            <Typography textAlign={"justify"} mb={2}>Ada banyak cara untuk optimalisasi query demi pencarian yang lebih cepat. Mulai dari menyusun atribut table dengan optimal, mengganti primary key dari auto increment menjadi UUID, menghindari join query, mengurangi pemakaian aggregation functions, melakukan select terhadap atribut yang perlu saja, sampai dengan melakukan indexing.</Typography>

            <Typography ref={nomor2Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>2. Jelaskan apa yang dimaksud dengan indeks dalam basis data dan bagaimana penggunaannya dapat meningkatkan performa query.</Typography>
            <Typography textAlign={"justify"} mb={2}>Index singkatnya adalah mengumpulkan data dalam beberapa kelompok atau cluster menggunakan key value dari kolom tertentu yang dapat mengurangi area pencarian sehingga mesin tidak mencari di keseluruhan tabel namun hanya pada bagian tertentu saja.</Typography>

            <Typography ref={nomor3Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>3. Berikan Contoh Bagaimana Anda akan membuat dashboard grafik interaktif dari data yang diambil dari basis data (misal: grafik penjualan perbulan/pertahun/persales dengan jumlah data 2 juta record) ?</Typography>
            <Typography textAlign={"justify"} mb={2}>Pengalaman dan waktu yang terbatas saya mengakibatkan saya hanya mampu melakukan query yang simpel seperti menyajikan data jumlah sales setiap tahun pada masing-masing bulan di tahun tersebut. Pada query tersebut saya menggunakan fungsi-fungsi waktu sepert year dan month untuk mengelompokkan data sales dan menggunakan fungsi sum untuk menjumlah seluruh valuenya. Berikut contoh hasil grafik batang yang saya buat berdasarkan tahun dan bulan dengan data random total 2.000.000 data:</Typography>

            <Box sx={{ mb: 4 }}>
              { !!dataBar1 ? (
                <Bar
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' as const, },
                      title: { display: true, text: `Data Penjualan Tahun 2023`, },
                    },
                  }}
                  data={{ 
                    labels: dataBar1?.labels,
                    datasets: [
                      {
                        label: "Total Penjualan",
                        backgroundColor: '#5463FF',
                        borderColor: '#5463FF',
                        data: dataBar1?.values,
                      },
                      // {
                      //   label: "Jumlah Gambar PDC",
                      //   backgroundColor: '#E04DB0',
                      //   borderColor: '#E04DB0',
                      //   data: barData?.images
                      // },
                      // {
                      //   label: "Jumlah Lampiran PDC",
                      //   backgroundColor: '#ff7f02',
                      //   borderColor: '#ff7f02',
                      //   data: barData?.files
                      // },
                    ]
                  }}
                />
              ) : null }
            </Box>
            <Box>
              { !!dataBar2 ? (
                <Bar
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' as const, },
                      title: { display: true, text: `Data Penjualan Tahun 2022`, },
                    },
                  }}
                  data={{ 
                    labels: dataBar2?.labels,
                    datasets: [
                      {
                        label: "Total Penjualan",
                        backgroundColor: '#E04DB0',
                        borderColor: '#E04DB0',
                        data: dataBar2?.values,
                      },
                    ]
                  }}
                />
              ) : null }
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ display: 'relative', position: "sticky", top: 100, }}>
            <CardMedia
              component="img"
              image="/images/query.jpeg"
            />
            <CardContent>
              <Stack direction={"column"} spacing={1} sx={{  }}>
                { sideNav.map((item, index) => (
                  <Typography
                    key={index} onClick={item.onClick}
                    variant="subtitle2" color={"primary.main"}
                    sx={{ cursor: "pointer" }}
                  ># {item.label}</Typography>
                )) }
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  )
}