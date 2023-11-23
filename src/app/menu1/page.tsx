"use client"

import { useRef } from "react"
import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";

import MainLayout from "../MainLayout";
import { MyScrollToRef } from "@/utils/MyScrollToRef";

export default function Menu1Page() {
  const nomor1Ref = useRef<HTMLDivElement>(null);
  const nomor2Ref = useRef<HTMLDivElement>(null);
  const nomor3Ref = useRef<HTMLDivElement>(null);

  const sideNav = [
    { label: "Nomor 1", onClick: () => MyScrollToRef(nomor1Ref) },
    { label: "Nomor 2", onClick: () => MyScrollToRef(nomor2Ref) },
    { label: "Nomor 3", onClick: () => MyScrollToRef(nomor3Ref) },
  ]
  
  return (
    <MainLayout appBarTitle='Menu Soal 1: OOP dan Pembuktiannya'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box sx={{ px: 2 }}>
            <Typography ref={nomor1Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>1. Apa itu OOP (Pemrograman Berorientasi Objek) dan mengapa itu penting dalam pengembangan perangkat lunak?</Typography>
            <Typography textAlign={"justify"} mb={2}>OOP adalah salah satu style dalam pembuatan sebuah system, OOP mengerucut pada aturan yang menetapkan gaya penulisan program bertumpu pada Objek, dimana hampir kebanyakan bentuk dan/struktur dalam software memiliki sebuah cetakan untuk menciptakan Objek tersebut. OOP penting karena dengan OOP program dapat berjalan sesuai dengan kegunaan yang telah ditetapkan pada masing-masing objek yang telah dibuat. Dengan penetapan tersebut seluruh sistem akan bergerak sesuai dengan jalur masing-masing yang dapat meminimalisir banyak sekali error, seperti: kesalahan struktur, kebingungan saat development, dan banyak lagi.</Typography>

            <Typography ref={nomor2Ref} fontWeight={700} fontSize={"1.2rem"}>2.	Jelaskan konsep utama dalam OOP seperti encapsulation, inheritance, dan polymorphism.</Typography>
            <Box component='ul'>
              <Typography component="li" textAlign={"justify"}>
                Encapsulation: adalah pemisahan data/atribut dari program utama, cara kerja nya adalah dengan menetapkan atribut yang dapat digunakan atau ditetapkan hanya pada Objek tertentu, sehingga Objek lain / global environment tidak semena-mena menggunakan seluruh atribut yang dimiliki oleh Objek tersebut.
              </Typography>
              <Typography component="li" textAlign={"justify"}>
                Inheritance: memiliki konsep yang sama dengan keturunan pada makhluk hidup, dimana terdapat Objek Orang Tua dan Objek Anak. Objek anak memiliki seluruh atribut dan fungsi yang telah diturunkan oleh Objek Orang Tua, namun Objek anak juga dapat memiliki atribut / fungsi tambahan.
              </Typography>
              <Typography component="li" textAlign={"justify"}>
                Polymorphism: adalah keberagaman bentuk dari sebuah interface yang sama. Dengan menggunakan inheritance, class dapat melakukan polimorphism. Contoh kasus nyata adalah anjing dan kucing sama-sama hewan, namun suara mereka berbeda.
              </Typography>
            </Box>

            <Typography ref={nomor3Ref} fontWeight={700} fontSize={"1.2rem"} mb={2}>3. Berikan contoh penggunaan OOP encapsulation, inheritance, polimorphism juga menerapkan SOLID principles dalam bahasa pemrograman yang Anda kuasai.</Typography>
            <Typography component="li" textAlign={"justify"}>Encapsultaion</Typography>
            <Box sx={{ bgcolor: '#eee', px: 2, py: 1, borderRadius: 2, mb: 2 }}>
              <Typography fontFamily={"courier new"} fontSize={"0.9rem"} whiteSpace={"pre-line"}>
                {
                  `class Hewan {
                    private nama: string
                    private jumlahKaki: number

                    constructor(nama: string, jumlahKaki: number) {
                      this.nama = nama;
                      this.jumlahKaki = jumlahKaki;
                    }

                    setNama(nama: string) { this.nama = nama; }
                    getNama(): string { return "Nama hewan: " + this.nama"; }
                  }

                  let hewan = new Hewan("doggy", 4);
                  console.info(hewan.nama) // error dan tidak dapat diakses karena encapsulation
                  console.info(hewan.getNama()) // berhasil terakses`
                }
              </Typography>
            </Box>

            <Typography component="li" textAlign={"justify"}>Inheritance</Typography>
            <Box sx={{ bgcolor: '#eee', px: 2, py: 1, borderRadius: 2, mb: 2 }}>
              <Typography fontFamily={"courier new"} fontSize={"0.9rem"} whiteSpace={"pre-line"}>
                {
                  `class Hewan {
                    private nama: string
                    private jumlahKaki: number
                  
                    constructor(nama: string, jumlahKaki: number) {
                      this.nama = nama;
                      this.jumlahKaki = jumlahKaki;
                    }
                  
                    setNama(nama: string) { this.nama = nama; }
                    getNama(): string { return "Nama hewan: " + this.nama; }
                  }
                  
                  class Anjing extends Hewan {
                    private umurRataRata: number
                  
                    constructor(nama: string, jumlahKaki: number, umurRataRata: number) {
                      super(nama, jumlahKaki);
                      this.umurRataRata = umurRataRata;
                    }
                  }
                  
                  let anjing = new Anjing("Anjing", 4, 16);
                  anjing.getNama() // Anjing mewarisi getNama() dari Hewan
                  `
                }
              </Typography>
            </Box>

            <Typography component="li" textAlign={"justify"}>Polimorphism</Typography>
            <Box sx={{ bgcolor: '#eee', px: 2, py: 1, borderRadius: 2, mb: 2 }}>
              <Typography fontFamily={"courier new"} fontSize={"0.9rem"} whiteSpace={"pre-line"}>
                {
                  `class Hewan {
                    private nama: string
                    private jumlahKaki: number
                  
                    constructor(nama: string, jumlahKaki: number) {
                      this.nama = nama;
                      this.jumlahKaki = jumlahKaki;
                    }
                  
                    setNama(nama: string) { this.nama = nama; }
                    getNama(): string { return "Nama hewan: " + this.nama; }
                  }
                  
                  class Anjing extends Hewan {
                    private umurRataRata: number
                  
                    constructor(nama: string, jumlahKaki: number, umurRataRata: number) {
                      super(nama, jumlahKaki);
                      this.umurRataRata = umurRataRata;
                    }
                  
                    bersuara() { return "Guk Guk!"; }
                  }
                  
                  class Kucing extends Hewan {
                    private warnaBulu: string
                    
                    constructor(nama: string, jumlahKaki: number, warnaBulu: string) {
                      super(nama, jumlahKaki);
                      this.warnaBulu = warnaBulu;
                    }
                  
                    bersuara() { return "Meow!"; }
                  }
                  
                  // Anjing dan Kucing memiliki kemampuan yang sama yaitu bersuara
                  // namun kemampuan tersebut dapat diubah sesuai class
                  let hewanA = new Anjing("doggy", 4, 12);
                  let hewanB = new Kucing("mimi", 4, "Oranye");
                  hewanA.bersuara(); // Akan menghasilkan Guk Guk!
                  hewanB.bersuara(); // Akan menghasilkan Meow!
                  `
                }
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ display: 'relative', position: "sticky", top: 100, }}>
            <CardMedia
              component="img"
              image="/images/oop.jpeg"
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