"use client"

import { useState, useEffect, useRef } from "react";
import { Box, Card, CardContent, CardMedia, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Stack } from "@mui/material";
import axios from "axios";

import MainLayout from "../MainLayout";
import { MyScrollToRef } from "@/utils/MyScrollToRef";

export default function Menu2Page() {
  const nomor1Ref = useRef<HTMLDivElement>(null);
  const nomor2Ref = useRef<HTMLDivElement>(null);
  const nomor3Ref = useRef<HTMLDivElement>(null);

  const sideNav = [
    { label: "Nomor 1", onClick: () => MyScrollToRef(nomor1Ref) },
    { label: "Nomor 2", onClick: () => MyScrollToRef(nomor2Ref) },
    { label: "Nomor 3", onClick: () => MyScrollToRef(nomor3Ref) },
  ]

  const [dataProvinsi, setDataProvinsi] = useState<{id:string,name:string}[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>('');
  const [dataKabupaten, setDataKabupaten] = useState<{id:string,province_id:string,name:string}[]>([]);
  const [selectedKabupaten, setSelectedKabupaten] = useState<string>('');
  const [dataKecamatan, setDataKecamatan] = useState<{id:string,regency_id:string,name:string}[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('');
  const [dataKelurahan, setDataKelurahan] = useState<{id:string,district_id:string,name:string}[]>([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>('');

  useEffect(() => {
    const fetchProvinsi = async () => {
      await axios.get("/api/provinsi")
      .then(res => {
        setDataProvinsi(res.data)
      })
    }

    fetchProvinsi();
  }, [])

  useEffect(() => {
    const fetchKabupaten = async () => {
      await axios.get(`/api/kabupaten?id=${selectedProvinsi}`)
      .then(res => {
        setDataKabupaten(res.data)
      })
    }

    setSelectedKabupaten('')
    if (!!selectedProvinsi && selectedProvinsi !== '') fetchKabupaten()
  }, [selectedProvinsi])

  useEffect(() => {
    const fetchKecamatan = async () => {
      await axios.get(`/api/kecamatan?id=${selectedKabupaten}`)
      .then(res => {
        setDataKecamatan(res.data)
      })
    }

    setSelectedKecamatan('')
    if (!!selectedKabupaten && selectedKabupaten !== '') fetchKecamatan()
  }, [selectedKabupaten])

  useEffect(() => {
    const fetchKelurahan = async () => {
      await axios.get(`/api/kelurahan?id=${selectedKecamatan}`)
      .then(res => {
        setDataKelurahan(res.data)
      })
    }

    setSelectedKelurahan('')
    if (!!selectedKecamatan && selectedKecamatan !== '') fetchKelurahan()
  }, [selectedKecamatan])

  return (
    <MainLayout appBarTitle='Menu Soal 2: UI Dropdown'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box sx={{ px: 2 }}>
            <Typography ref={nomor1Ref} fontWeight={700} fontSize={"1.2rem"}>1. Apa itu dependent dropdown (pilihan terkait) dan kapan Anda akan menggunakannya dalam pengembangan web?</Typography>
            <Typography textAlign={"justify"} mb={2}>
              Adalah dropdown/select yang akan memiliki pilihan yang mengacu pada input lainnya (dapat dropdown lainnya, maupun input lainnya). Digunakan pada saat pilihan yang tersedia hanya dapat diketahui ketika input yang menjadi acuan telah terpilih. Seperti select mengenai data regional/daerah.
            </Typography>

            <Typography ref={nomor2Ref} fontWeight={700} fontSize={"1.2rem"}>2. Bagaimana Anda akan mengimplementasikan dependent dropdown dalam JavaScript atau kerangka kerja tertentu yang anda kuasai?</Typography>
            <Box component={"ol"}>
              <Typography component="li" textAlign={"justify"}>
                Load data dropdown yang paling utama (dropdown yang ditumpu oleh dropdown lainnya). Dalam contoh kasus adalah Provinsi. Dropdown lainnya masih dalam keadaan kosong.
              </Typography>
              <Typography component="li" textAlign={"justify"}>
                Ketika user telah memilih provinsi dari dropdown utama, langsung load data dari dropdown selanjutnya menggunakan key dari dropdown pertama (Load biasanya menggunakan AJAX namun juga ada beberapa yang melakukan load ulang halaman).
              </Typography>
              <Typography component="li" textAlign={"justify"}>
                Proses di atas akan terjadi berulang selama dropdown dependant masih ada.
              </Typography>
            </Box>

            <Typography ref={nomor3Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>3. Berikan contoh penggunaan Dependent Dropdown dalam bahasa pemrograman yang anda kuasai. (Negara, Propinsi, Kabupaten/Kota, Kecamatan, Kelurahan)</Typography>
            <Stack direction={"column"} gap={2}>
              <FormControl fullWidth>
                <InputLabel id="input-provinsi-label">Provinsi</InputLabel>
                <Select
                  labelId="input-provinsi-label"
                  id="input-provinsi"
                  value={selectedProvinsi?.toString()}
                  label="Provinsi"
                  onChange={(event: SelectChangeEvent) => {
                    setSelectedProvinsi(event.target.value);
                  }}
                >
                  <MenuItem value={""}></MenuItem>
                  { dataProvinsi.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  )) }
                </Select>
              </FormControl>
              <FormControl fullWidth disabled={!selectedProvinsi || selectedProvinsi===''}>
                <InputLabel id="input-kabupaten-label">Kabupaten/Kota</InputLabel>
                <Select
                  labelId="input-kabupaten-label"
                  id="input-kabupaten"
                  value={selectedKabupaten?.toString()}
                  label="Kabupaten/Kota"
                  onChange={(event: SelectChangeEvent) => {
                    setSelectedKabupaten(event.target.value);
                  }}
                >
                  <MenuItem value={""}></MenuItem>
                  { dataKabupaten.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  )) }
                </Select>
              </FormControl>
              <FormControl fullWidth disabled={!selectedKabupaten || selectedKabupaten===''}>
                <InputLabel id="input-kecamatan-label">Kecamatan</InputLabel>
                <Select
                  labelId="input-kecamatan-label"
                  id="input-kecamatan"
                  value={selectedKecamatan?.toString()}
                  label="Kecamatan"
                  onChange={(event: SelectChangeEvent) => {
                    setSelectedKecamatan(event.target.value);
                  }}
                >
                  <MenuItem value={""}></MenuItem>
                  { dataKecamatan.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  )) }
                </Select>
              </FormControl>
              <FormControl fullWidth disabled={!selectedKecamatan || selectedKecamatan===''}>
                <InputLabel id="input-kelurahan-label">Kelurahan</InputLabel>
                <Select
                  labelId="input-kelurahan-label"
                  id="input-kelurahan"
                  value={selectedKelurahan?.toString()}
                  label="Kelurahan"
                  onChange={(event: SelectChangeEvent) => {
                    setSelectedKelurahan(event.target.value);
                  }}
                >
                  <MenuItem value={""}></MenuItem>
                  { dataKelurahan.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                  )) }
                </Select>
              </FormControl>
            </Stack>
            <Box sx={{ height: "300px" }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ display: 'relative', position: "sticky", top: 100, }}>
            <CardMedia
              component="img"
              image="/images/ui.jpeg"
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