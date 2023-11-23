"use client"

import { useRef } from "react"
import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";

import MainLayout from "../MainLayout";
import { MyScrollToRef } from "@/utils/MyScrollToRef";

export default function Menu4Page() {
  const nomor1Ref = useRef<HTMLDivElement>(null);
  const nomor2Ref = useRef<HTMLDivElement>(null);

  const sideNav = [
    { label: "Nomor 1", onClick: () => MyScrollToRef(nomor1Ref) },
    { label: "Nomor 2", onClick: () => MyScrollToRef(nomor2Ref) },
  ]

  return (
    <MainLayout appBarTitle="Menu Soal 4: Debugging dan Unit Testing">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box sx={{ px: 2 }}>
            <Typography ref={nomor1Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>1. Apa itu unit testing dan mengapa penting dalam pengembangan perangkat lunak?</Typography>
            <Typography textAlign={"justify"} mb={2}>Adalah serangkaian uji coba pada aplikasi yang dibuat dalam skala yang kecil atau detail. Seperti pada baris kode, fungsi-fungsi, metode, modul, atau objek. Berdasarkan prosesnya terdapat 2 jenis unit test yang cukup terkenal saat ini, Black box testing dan White box testing. Black box testing mengutamakan input dan output dari unit tersebut, sedangkan White box testing melihat sampai ke dalam proses unit tersebut menghasilkan sebuah output. Testing sendiri sangat penting bagi pengembangan aplikasi karena dapat mengetahui dan menanggulangi error pada saat development, terlebih lagi unit test. Dengan testing yang dilakukan dalam skala kecil, developer dapat menghindari kesalahan fatal pada saat seluruh fungsi berjalan bersama, karena terdapat kesulitan menemukan kesalahan kecil yang tersembunyi jika sistem sudah berjalan bersamaan.</Typography>

            <Typography ref={nomor2Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>2. Bagaimana Anda akan melakukan unit testing dalam bahasa pemrograman yang Anda kuasai? Berikan contoh sederhana.</Typography>
            <Typography textAlign={"justify"} mb={2}>Menurut yang saya ketahui, terdapat 2 tipe unit test, yaitu manual dan automatic. Saya tidak memiliki banyak kesempatan untuk menggunakan automated unit testing karena project yang saya kerjakan selama ini tidak dalam skala yang sangat besar. Sehingga automated unit testing akan justru merugikan pada saat development. Oleh karena itu yang biasa saya terapkan adalah manual unit test murni menggunakan tenaga manusia yaitu para developer itu sendiri. Manual testing yang biasa saya lakukan:</Typography>
            <Box component={"ul"}>
              <Typography component="li">
                Frontend
                <Box component="ul">
                  <Typography component="li">Responsive test: untuk menentukan apakah halaman dapat nyaman dibuka setiap device secara umum.</Typography>
                  <Typography component="li">UI component test: uji coba pada masing-masing komponen UI apakah berperilaku sesuai keinginan dan tidak berpotensi menyebapkan error (eg: Button, Menu, Navlink, etc).</Typography>
                  <Typography component="li">Authentication state test: menguji apakah state auth user dapat bertahan pada sisi client sesuai keinginan.</Typography>
                  <Typography component="li">Protected route test: uji coba pada route yang dibatasi aksesnya terhadap user tertentu (eg: admin only page, logged in user only page, not logged in only page, etc).</Typography>
                </Box>
              </Typography>
              <Typography component="li">
                Backend
                <Box component="ul">
                  <Typography component="li">Response code test: memastikan bahwa kode yang dikembalikan sesuai, jika success maka mengembalikan 200, jika error maka mengembalikan error code yang sesuai.</Typography>
                  <Typography component="li">Algorithm test: uji coba pada algoritma yang dibuat pada fungsi tertentu, apakah sudah mendapat hasil yang sesuai dengan keinginan.</Typography>
                  <Typography component="li">Protected endpoint test: uji coba pada endpoint yang dilindungi user access.</Typography>
                  <Typography component="li">Input validation test: uji coba pada validasi terhadap berbagai macam input yang diberi oleh client.</Typography>
                </Box>
              </Typography>
            </Box>
            <Typography textAlign={"justify"}>Namun saya pernah mencoba sebagian kecil automated unit testing pada project kuliah menggunakan unit test function bawaan program postman. Berikut adalah contoh salah stau unit test pada project kuliah saya:</Typography>
            <Box sx={{ bgcolor: '#eee', px: 2, py: 1, borderRadius: 2, mb: 2 }}>
              <Typography fontFamily={"courier new"} fontSize={"0.9rem"} whiteSpace={"pre-wrap"}>
                {
`// Contoh unit test untuk mendapatkan array dari data yang sudah diurutkan
const schema = {
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "_id",
      "title",
      "description",
      "author"
    ],
    "properties": {
      "_id": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "author": {
        "type": "string"
      }
    }
  }
}
// Untuk melakukan testing pada status code
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Schema is valid", () => {
  pm.response.to.have.jsonSchema(schema)
})
// Untuk mengetahui apakah data yang dikembalikan sudah benar terurutkan sesuai input
pm.test("Data is sorted by title ascending", () => {
  var hasil = pm.response.json()
  var title = []
  var title_sorted = []
  for(let i = 0; i < hasil.length; i++) {
      title.push(hasil[i].title)
  }
  title_sorted = [...title]
  title_sorted.sort()
  pm.expect(JSON.stringify(title)).equals(JSON.stringify(title_sorted))
})`
                }
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ display: 'relative', position: "sticky", top: 100, }}>
            <CardMedia
              component="img"
              image="/images/debugging-testing.jpg"
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