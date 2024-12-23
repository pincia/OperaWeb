// third-party
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';

const initialState = {
    error: null,
    currentImportedProject: {
        "id": 2,
        "object": "",
        "province": null,
        "city": "Comune di Massafra",
        "works": "Programma â€œSICURO, VERDE E SOCIALE: Riqualificazione dell'edilizia residenziale pubblicaâ€ di cui all'art. 1, comma 2, lettera c) punto 13 del D.L. 6 maggio 2021, n.59 convertito con modificazione dalla L. 1 luglio 2021, n.101 - INTERVENTO DI EFFICIENTAMENTO ENERGETICO A N.22 ALLOGGI IN MASSAFRA ALLA VIA PER CRISPIANO SITI IN MASSAFRA (TA)",
        "totalAmount": 1758311.23,
        "notes": null,
        "public": false,
        "gig": null,
        "cup": null,
        "creationDate": "2024-12-22T17:42:30.3042056",
        "lastUpdateDate": "2024-12-22T17:42:30.304254",
        "userID": null,
        "soaCategoryId": -1,
        "soaClassificationID": -1,
        "jobs": [
            {
                "id": 1,
                "description": "LAVORI A MISURA",
                "originalId": -1,
                "parentId": 0,
                "level": 1,
                "entries": null,
                "children": [
                    {
                        "id": 1,
                        "description": "Scala C",
                        "originalId": 1,
                        "parentId": 1,
                        "level": 2,
                        "entries": [],
                        "children": [
                            {
                                "id": 1,
                                "description": "OG1 - Edifici civili e industriali",
                                "originalId": 1,
                                "parentId": 1,
                                "level": 3,
                                "entries": [],
                                "children": [
                                    {
                                        "id": 1,
                                        "description": "Demolizioni e rimozioni",
                                        "originalId": 1,
                                        "parentId": 1,
                                        "level": 4,
                                        "entries": [
                                            {
                                                "id": 1,
                                                "description": "",
                                                "unit": "mq",
                                                "price": 6.80,
                                                "code": "E.002.042",
                                                "measurements": [
                                                    {
                                                        "id": 1,
                                                        "description": "rimozione manto di impermeabilizzazione",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 2,
                                                        "description": "copertura piana  - scala C - sommano mq",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 2301.00
                                                    },
                                                    {
                                                        "id": 3,
                                                        "description": "parapetto laterale - scala C",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 10935.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 10935.00
                                                    },
                                                    {
                                                        "id": 4,
                                                        "description": "torrino scala - scala C - sommano mq",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 2628.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 2,
                                                "description": "",
                                                "unit": "mq",
                                                "price": 12.10,
                                                "code": "E.002.029.b",
                                                "measurements": [
                                                    {
                                                        "id": 5,
                                                        "description": "demolizione masso di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 6,
                                                        "description": "copertura piana  - scala C - sommano mq",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 2301.00
                                                    },
                                                    {
                                                        "id": 7,
                                                        "description": "torrino scala  - scala C - sommano mq",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 2628.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 3,
                                                "description": "",
                                                "unit": "m",
                                                "price": 9.10,
                                                "code": "E.002.041.a",
                                                "measurements": [
                                                    {
                                                        "id": 8,
                                                        "description": "demolizione di ricorrenza su parapetto di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 9,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 175.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 175.00
                                                    },
                                                    {
                                                        "id": 10,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 266.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 266.00
                                                    },
                                                    {
                                                        "id": 11,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 767.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 767.00
                                                    },
                                                    {
                                                        "id": 12,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 97.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 97.00
                                                    },
                                                    {
                                                        "id": 13,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 305.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 305.00
                                                    },
                                                    {
                                                        "id": 14,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 252.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 252.00
                                                    },
                                                    {
                                                        "id": 15,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 3.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 3.00
                                                    },
                                                    {
                                                        "id": 16,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 81.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 81.00
                                                    },
                                                    {
                                                        "id": 17,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 49.00
                                                    },
                                                    {
                                                        "id": 18,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 442.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 442.00
                                                    },
                                                    {
                                                        "id": 19,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 416.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 416.00
                                                    },
                                                    {
                                                        "id": 20,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 49.00
                                                    },
                                                    {
                                                        "id": 21,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 267.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 267.00
                                                    },
                                                    {
                                                        "id": 22,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 8.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 8.00
                                                    },
                                                    {
                                                        "id": 23,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 233.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 233.00
                                                    },
                                                    {
                                                        "id": 24,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 336.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 25,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 95.00
                                                    },
                                                    {
                                                        "id": 26,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 762.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 762.00
                                                    },
                                                    {
                                                        "id": 27,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 17.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 17.00
                                                    },
                                                    {
                                                        "id": 28,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 284.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 284.00
                                                    },
                                                    {
                                                        "id": 29,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 30,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 96.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 96.00
                                                    },
                                                    {
                                                        "id": 31,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 12.00
                                                    },
                                                    {
                                                        "id": 32,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 33,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 192.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 192.00
                                                    },
                                                    {
                                                        "id": 34,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 537.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 537.00
                                                    },
                                                    {
                                                        "id": 35,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 247.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 247.00
                                                    },
                                                    {
                                                        "id": 36,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 169.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 169.00
                                                    },
                                                    {
                                                        "id": 37,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 21.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 21.00
                                                    },
                                                    {
                                                        "id": 38,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 248.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 248.00
                                                    },
                                                    {
                                                        "id": 39,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 525.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 525.00
                                                    },
                                                    {
                                                        "id": 40,
                                                        "description": "paretina di copertura",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 174.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 174.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 4,
                                                "description": "",
                                                "unit": "m",
                                                "price": 9.10,
                                                "code": "E.002.041.a",
                                                "measurements": [
                                                    {
                                                        "id": 41,
                                                        "description": "rimozione di ricorrenza in marmo su paretine/muretti poste al piano terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 42,
                                                        "description": "Piano Terra - App01 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 241.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 241.00
                                                    },
                                                    {
                                                        "id": 43,
                                                        "description": "Piano Terra - App01 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 57.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 44,
                                                        "description": "Piano Terra - Rampa esterna",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 86.00
                                                    },
                                                    {
                                                        "id": 45,
                                                        "description": "Piano Terra - Rampa esterna",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 27.00
                                                    },
                                                    {
                                                        "id": 46,
                                                        "description": "Piano Terra - App02 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 607.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 607.00
                                                    },
                                                    {
                                                        "id": 47,
                                                        "description": "Piano Terra - App02 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 252.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 252.00
                                                    },
                                                    {
                                                        "id": 48,
                                                        "description": "Piano Terra - App02 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 282.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 282.00
                                                    },
                                                    {
                                                        "id": 49,
                                                        "description": "Piano Terra - App02 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 657.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 657.00
                                                    },
                                                    {
                                                        "id": 50,
                                                        "description": "Piano Terra - App02 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 252.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 252.00
                                                    },
                                                    {
                                                        "id": 51,
                                                        "description": "Piano Terra - App01 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 772.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 772.00
                                                    },
                                                    {
                                                        "id": 52,
                                                        "description": "Piano Terra - App01 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 284.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 284.00
                                                    },
                                                    {
                                                        "id": 53,
                                                        "description": "Piano Terra - App01 - PT",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 27.00
                                                    },
                                                    {
                                                        "id": 54,
                                                        "description": "",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 55,
                                                        "description": "rimozione di ricorrenze in marmo su logge esterne - sommano lunghezze*spessore",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 56,
                                                        "description": "",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 394.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 394.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 5,
                                                "description": "",
                                                "unit": "mq",
                                                "price": 8.40,
                                                "code": "E.002.049.a",
                                                "measurements": [
                                                    {
                                                        "id": 57,
                                                        "description": "rimozione intonaco su muretti rampe esistenti",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 58,
                                                        "description": "parete Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 163.00,
                                                        "quantita": 2804.00
                                                    },
                                                    {
                                                        "id": 59,
                                                        "description": "parete Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 2.00,
                                                        "quantita": 108.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 6,
                                                "description": "",
                                                "unit": "mq",
                                                "price": 5.13,
                                                "code": "BAS_B.02.012.01",
                                                "measurements": [
                                                    {
                                                        "id": 60,
                                                        "description": "rimozione tinteggiatura esistente nelle solo parti ammalorate - intervento da effettuare solo sulle facciate esterne",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 61,
                                                        "description": "parete - Copertura - Involucro 123 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 762.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 762.00
                                                    },
                                                    {
                                                        "id": 62,
                                                        "description": "parete - Copertura - Involucro 135 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 143.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 143.00
                                                    },
                                                    {
                                                        "id": 63,
                                                        "description": "parete - Copertura - Involucro 147 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 767.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 767.00
                                                    },
                                                    {
                                                        "id": 64,
                                                        "description": "parete - Copertura - Involucro 128 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 22.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 22.00
                                                    },
                                                    {
                                                        "id": 65,
                                                        "description": "parete - Copertura - Involucro 139 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 97.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 97.00
                                                    },
                                                    {
                                                        "id": 66,
                                                        "description": "parete - App01 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 486.00
                                                    },
                                                    {
                                                        "id": 67,
                                                        "description": "parete - App01 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 68,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 69,
                                                        "description": "parete - App01 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 63.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 189.00
                                                    },
                                                    {
                                                        "id": 70,
                                                        "description": "parete - App01 - PQ - Bagno - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 71,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 72,
                                                        "description": "parete - App01 - PQ - Cucina - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 237.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 711.00
                                                    },
                                                    {
                                                        "id": 73,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 74,
                                                        "description": "parete - App01 - PQ - Cucina / Cucina - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 75,
                                                        "description": "parete - App02 - PQ - Cucina - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 117.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 351.00
                                                    },
                                                    {
                                                        "id": 76,
                                                        "description": "parete - App02 - PQ - Cucina - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 194.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 582.00
                                                    },
                                                    {
                                                        "id": 77,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 78,
                                                        "description": "parete - App02 - PQ - Bagno - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 79,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 80,
                                                        "description": "parete - App01 - PQ - Involucro 416 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 113.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 339.00
                                                    },
                                                    {
                                                        "id": 81,
                                                        "description": "a detrarre foro Involucro 416",
                                                        "larghezza": 98.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -167.00
                                                    },
                                                    {
                                                        "id": 82,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 134.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 402.00
                                                    },
                                                    {
                                                        "id": 83,
                                                        "description": "parete - App02 - PQ - Involucro 539 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 122.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 366.00
                                                    },
                                                    {
                                                        "id": 84,
                                                        "description": "a detrarre foro Involucro 539",
                                                        "larghezza": 1.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -17.00
                                                    },
                                                    {
                                                        "id": 85,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 86,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 87,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 132.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 396.00
                                                    },
                                                    {
                                                        "id": 88,
                                                        "description": "parete - Vano scala - Involucro 45 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 174.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 574.00
                                                    },
                                                    {
                                                        "id": 89,
                                                        "description": "parete - Vano scala - Involucro 137 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 247.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 815.00
                                                    },
                                                    {
                                                        "id": 90,
                                                        "description": "parete - App02 - PQ - Involucro 449 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 123.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 369.00
                                                    },
                                                    {
                                                        "id": 91,
                                                        "description": "parete - Vano scala - Involucro 40 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 169.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 558.00
                                                    },
                                                    {
                                                        "id": 92,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 501.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1503.00
                                                    },
                                                    {
                                                        "id": 93,
                                                        "description": "parete - App01 - PQ - Sala da pranzo - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 374.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1122.00
                                                    },
                                                    {
                                                        "id": 94,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 95,
                                                        "description": "parete - App02 - PQ - Sala da pranzo - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 416.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1248.00
                                                    },
                                                    {
                                                        "id": 96,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 97,
                                                        "description": "parete - Vano scala - Involucro 41 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 525.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 1733.00
                                                    },
                                                    {
                                                        "id": 98,
                                                        "description": "parete - Vano scala - Involucro 44 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 537.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 1772.00
                                                    },
                                                    {
                                                        "id": 99,
                                                        "description": "a detrarre porta Involucro 44",
                                                        "larghezza": 9.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 21.00,
                                                        "quantita": -189.00
                                                    },
                                                    {
                                                        "id": 100,
                                                        "description": "parete - App01 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 486.00
                                                    },
                                                    {
                                                        "id": 101,
                                                        "description": "parete - App01 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 102,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 103,
                                                        "description": "parete - App01 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 63.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 189.00
                                                    },
                                                    {
                                                        "id": 104,
                                                        "description": "parete - App01 - PTer - Bagno - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 105,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 106,
                                                        "description": "parete - App01 - PTer - Cucina - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 237.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 711.00
                                                    },
                                                    {
                                                        "id": 107,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 108,
                                                        "description": "parete - App02 - PTer - Cucina - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 194.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 582.00
                                                    },
                                                    {
                                                        "id": 109,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 110,
                                                        "description": "parete - App02 - PTer - Bagno - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 111,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 112,
                                                        "description": "parete - App01 - PTer - Involucro 312 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 113.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 339.00
                                                    },
                                                    {
                                                        "id": 113,
                                                        "description": "a detrarre foro Involucro 312",
                                                        "larghezza": 98.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -167.00
                                                    },
                                                    {
                                                        "id": 114,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 134.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 402.00
                                                    },
                                                    {
                                                        "id": 115,
                                                        "description": "parete - App02 - PTer - Involucro 291 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 122.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 366.00
                                                    },
                                                    {
                                                        "id": 116,
                                                        "description": "a detrarre foro Involucro 291",
                                                        "larghezza": 101.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -172.00
                                                    },
                                                    {
                                                        "id": 117,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 118,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 119,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 132.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 396.00
                                                    },
                                                    {
                                                        "id": 120,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 501.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1503.00
                                                    },
                                                    {
                                                        "id": 121,
                                                        "description": "parete - App02 - PTer - Involucro 311 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 123.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 369.00
                                                    },
                                                    {
                                                        "id": 122,
                                                        "description": "parete - App01 - PTer - Cucina / Cucina - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 123,
                                                        "description": "parete - App02 - PTer - Cucina - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 117.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 351.00
                                                    },
                                                    {
                                                        "id": 124,
                                                        "description": "parete - App01 - PTer - Sala da pranzo - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 374.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1122.00
                                                    },
                                                    {
                                                        "id": 125,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 126,
                                                        "description": "parete - App02 - PTer - Sala da pranzo - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 416.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1248.00
                                                    },
                                                    {
                                                        "id": 127,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 128,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 445.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1335.00
                                                    },
                                                    {
                                                        "id": 129,
                                                        "description": "parete - App01 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 486.00
                                                    },
                                                    {
                                                        "id": 130,
                                                        "description": "parete - App01 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 131,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 132,
                                                        "description": "parete - App01 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 63.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 189.00
                                                    },
                                                    {
                                                        "id": 133,
                                                        "description": "parete - App01 - PS - Bagno - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 134,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 135,
                                                        "description": "parete - App01 - PS - Cucina - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 3.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 9.00
                                                    },
                                                    {
                                                        "id": 136,
                                                        "description": "parete - App01 - PS - Cucina - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 207.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 621.00
                                                    },
                                                    {
                                                        "id": 137,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 138,
                                                        "description": "parete - App01 - PS - Cucina / Cucina - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 139,
                                                        "description": "parete - App02 - PS - Cucina - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 117.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 351.00
                                                    },
                                                    {
                                                        "id": 140,
                                                        "description": "parete - App02 - PS - Cucina - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 214.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 642.00
                                                    },
                                                    {
                                                        "id": 141,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 142,
                                                        "description": "parete - App02 - PS - Bagno - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 16.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 48.00
                                                    },
                                                    {
                                                        "id": 143,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 144,
                                                        "description": "parete - Vano scala - Involucro 39 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 21.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 693.00
                                                    },
                                                    {
                                                        "id": 145,
                                                        "description": "parete - App01 - PS - Involucro 1193 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 118.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 354.00
                                                    },
                                                    {
                                                        "id": 146,
                                                        "description": "a detrarre foro Involucro 1193",
                                                        "larghezza": 98.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -167.00
                                                    },
                                                    {
                                                        "id": 147,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 134.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 402.00
                                                    },
                                                    {
                                                        "id": 148,
                                                        "description": "parete - App02 - PS - Involucro 1176 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 121.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 363.00
                                                    },
                                                    {
                                                        "id": 149,
                                                        "description": "a detrarre foro Involucro 1176",
                                                        "larghezza": 101.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -172.00
                                                    },
                                                    {
                                                        "id": 150,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 151,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 152,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 132.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 396.00
                                                    },
                                                    {
                                                        "id": 153,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 499.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1497.00
                                                    },
                                                    {
                                                        "id": 154,
                                                        "description": "parete - Vano scala - Involucro 43 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 192.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 634.00
                                                    },
                                                    {
                                                        "id": 155,
                                                        "description": "parete - App02 - PS - Involucro 1058 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 156,
                                                        "description": "parete - App01 - PS - Sala da pranzo - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 38.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 114.00
                                                    },
                                                    {
                                                        "id": 157,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 158,
                                                        "description": "parete - Copertura - Involucro 145 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 305.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 305.00
                                                    },
                                                    {
                                                        "id": 159,
                                                        "description": "parete - App02 - PS - Sala da pranzo - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 414.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1242.00
                                                    },
                                                    {
                                                        "id": 160,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 161,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 445.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1335.00
                                                    },
                                                    {
                                                        "id": 162,
                                                        "description": "parete - Vano scala - Involucro 42 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 248.00,
                                                        "hPeso": 51.00,
                                                        "quantita": 1265.00
                                                    },
                                                    {
                                                        "id": 163,
                                                        "description": "a detrarre finestra Involucro 42",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 2.00,
                                                        "quantita": -12.00
                                                    },
                                                    {
                                                        "id": 164,
                                                        "description": "parete - App01 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 141.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 423.00
                                                    },
                                                    {
                                                        "id": 165,
                                                        "description": "parete - App01 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 166,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 167,
                                                        "description": "parete - App01 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 54.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 168,
                                                        "description": "parete - App01 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 81.00
                                                    },
                                                    {
                                                        "id": 169,
                                                        "description": "parete - App01 - PQ - Camera - Singola - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 289.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 867.00
                                                    },
                                                    {
                                                        "id": 170,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 171,
                                                        "description": "parete - App01 - PQ - Soggiorno - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 164.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 492.00
                                                    },
                                                    {
                                                        "id": 172,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 173,
                                                        "description": "parete - App02 - PQ - Soggiorno - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 183.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 549.00
                                                    },
                                                    {
                                                        "id": 174,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 175,
                                                        "description": "parete - App02 - PQ - Camera - Singola - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 253.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 759.00
                                                    },
                                                    {
                                                        "id": 176,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 177,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 88.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 178,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 39.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 117.00
                                                    },
                                                    {
                                                        "id": 179,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 180,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 181,
                                                        "description": "parete - App02 - PQ - Camera - Doppia - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 135.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 405.00
                                                    },
                                                    {
                                                        "id": 182,
                                                        "description": "parete - App01 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 486.00
                                                    },
                                                    {
                                                        "id": 183,
                                                        "description": "parete - App01 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 184,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 185,
                                                        "description": "parete - App01 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 6.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 18.00
                                                    },
                                                    {
                                                        "id": 186,
                                                        "description": "parete - App01 - PP - Bagno - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 23.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 69.00
                                                    },
                                                    {
                                                        "id": 187,
                                                        "description": "parete - App01 - PP - Bagno - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 19.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 188,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 189,
                                                        "description": "parete - App01 - PP - Sala da pranzo - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 229.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 687.00
                                                    },
                                                    {
                                                        "id": 190,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 191,
                                                        "description": "parete - App02 - PP - Sala da pranzo - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 121.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 363.00
                                                    },
                                                    {
                                                        "id": 192,
                                                        "description": "parete - App02 - PP - Sala da pranzo - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 207.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 621.00
                                                    },
                                                    {
                                                        "id": 193,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 194,
                                                        "description": "parete - App02 - PP - Bagno - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 195,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 196,
                                                        "description": "parete - App01 - PP - Involucro 663 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 118.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 354.00
                                                    },
                                                    {
                                                        "id": 197,
                                                        "description": "a detrarre foro Involucro 663",
                                                        "larghezza": 98.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -167.00
                                                    },
                                                    {
                                                        "id": 198,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 135.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 405.00
                                                    },
                                                    {
                                                        "id": 199,
                                                        "description": "parete - App02 - PP - Involucro 661 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 121.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 363.00
                                                    },
                                                    {
                                                        "id": 200,
                                                        "description": "a detrarre foro Involucro 661",
                                                        "larghezza": 101.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 17.00,
                                                        "quantita": -172.00
                                                    },
                                                    {
                                                        "id": 201,
                                                        "description": "parete - App02 - PP - Camera - Doppia / Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 202,
                                                        "description": "a detrarre finestra Camera - Doppia / Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 203,
                                                        "description": "parete - App02 - PP - Camera - Doppia / Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 127.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 381.00
                                                    },
                                                    {
                                                        "id": 204,
                                                        "description": "parete - App01 - PQ - Soggiorno - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 425.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1275.00
                                                    },
                                                    {
                                                        "id": 205,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 206,
                                                        "description": "parete - App02 - PP - Involucro 708 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 207,
                                                        "description": "parete - App02 - PQ - Soggiorno - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 442.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1326.00
                                                    },
                                                    {
                                                        "id": 208,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 209,
                                                        "description": "parete - App01 - PP - Sala da pranzo - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 126.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 378.00
                                                    },
                                                    {
                                                        "id": 210,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 491.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1473.00
                                                    },
                                                    {
                                                        "id": 211,
                                                        "description": "parete - Vano scala - Involucro 601 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 212,
                                                        "description": "parete - Vano scala - Involucro 618 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 213,
                                                        "description": "parete - App01 - PP - Sala da pranzo - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 375.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1125.00
                                                    },
                                                    {
                                                        "id": 214,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 215,
                                                        "description": "parete - App02 - PP - Sala da pranzo - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 406.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1218.00
                                                    },
                                                    {
                                                        "id": 216,
                                                        "description": "a detrarre finestra Sala da pranzo",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 217,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 455.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1365.00
                                                    },
                                                    {
                                                        "id": 218,
                                                        "description": "parete - Vano scala - Involucro 597 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 55.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 165.00
                                                    },
                                                    {
                                                        "id": 219,
                                                        "description": "parete - Vano scala - Involucro 620 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 147.00
                                                    },
                                                    {
                                                        "id": 220,
                                                        "description": "parete - App01 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 141.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 423.00
                                                    },
                                                    {
                                                        "id": 221,
                                                        "description": "parete - App01 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 222,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 223,
                                                        "description": "parete - App01 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 54.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 224,
                                                        "description": "parete - App01 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 81.00
                                                    },
                                                    {
                                                        "id": 225,
                                                        "description": "parete - App01 - PTer - Camera - Singola - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 289.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 867.00
                                                    },
                                                    {
                                                        "id": 226,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 227,
                                                        "description": "parete - App02 - PTer - Camera - Singola - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 253.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 759.00
                                                    },
                                                    {
                                                        "id": 228,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 229,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 88.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 230,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 39.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 117.00
                                                    },
                                                    {
                                                        "id": 231,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 232,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 233,
                                                        "description": "parete - App02 - PTer - Camera - Doppia - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 135.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 405.00
                                                    },
                                                    {
                                                        "id": 234,
                                                        "description": "parete - App01 - PTer - Soggiorno - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 164.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 492.00
                                                    },
                                                    {
                                                        "id": 235,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 236,
                                                        "description": "parete - App02 - PTer - Soggiorno - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 183.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 549.00
                                                    },
                                                    {
                                                        "id": 237,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 238,
                                                        "description": "parete - App01 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 164.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 492.00
                                                    },
                                                    {
                                                        "id": 239,
                                                        "description": "parete - App01 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 240,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 241,
                                                        "description": "parete - App01 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 63.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 189.00
                                                    },
                                                    {
                                                        "id": 242,
                                                        "description": "parete - App01 - PT - Bagno - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 243,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 244,
                                                        "description": "parete - App01 - PT - Cucina - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 24.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 72.00
                                                    },
                                                    {
                                                        "id": 245,
                                                        "description": "parete - Amb Servizi - Centrale Idrica - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 254.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 762.00
                                                    },
                                                    {
                                                        "id": 246,
                                                        "description": "parete - App02 - PT - Cucina - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 173.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 519.00
                                                    },
                                                    {
                                                        "id": 247,
                                                        "description": "parete - App02 - PT - Cucina - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 191.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 573.00
                                                    },
                                                    {
                                                        "id": 248,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 249,
                                                        "description": "parete - App02 - PT - Bagno - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 18.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 250,
                                                        "description": "a detrarre finestra Bagno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 251,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 135.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 405.00
                                                    },
                                                    {
                                                        "id": 252,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 125.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 375.00
                                                    },
                                                    {
                                                        "id": 253,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 254,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 141.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 423.00
                                                    },
                                                    {
                                                        "id": 255,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 499.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1497.00
                                                    },
                                                    {
                                                        "id": 256,
                                                        "description": "parete - App01 - PTer - Soggiorno - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 425.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1275.00
                                                    },
                                                    {
                                                        "id": 257,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 258,
                                                        "description": "parete - Vano scala - Involucro 280 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 259,
                                                        "description": "parete - Vano scala - Involucro 226 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 260,
                                                        "description": "parete - App02 - PTer - Soggiorno - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 442.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1326.00
                                                    },
                                                    {
                                                        "id": 261,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 262,
                                                        "description": "parete - Vano scala - Involucro 546 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 88.00,
                                                        "hPeso": 12.00,
                                                        "quantita": 106.00
                                                    },
                                                    {
                                                        "id": 263,
                                                        "description": "parete - Vano scala - Vano scala - Edificio C - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 63.00,
                                                        "hPeso": 132.00,
                                                        "quantita": 832.00
                                                    },
                                                    {
                                                        "id": 264,
                                                        "description": "a detrarre finestra Vano scala - Edificio C",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": -162.00
                                                    },
                                                    {
                                                        "id": 265,
                                                        "description": "a detrarre finestra Vano scala - Edificio C",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": -162.00
                                                    },
                                                    {
                                                        "id": 266,
                                                        "description": "a detrarre finestra Vano scala - Edificio C",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": -162.00
                                                    },
                                                    {
                                                        "id": 267,
                                                        "description": "a detrarre finestra Vano scala - Edificio C",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": -162.00
                                                    },
                                                    {
                                                        "id": 268,
                                                        "description": "parete - Vano scala - Involucro 470 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 12.00,
                                                        "quantita": 103.00
                                                    },
                                                    {
                                                        "id": 269,
                                                        "description": "parete - Amb Servizi - Centrale Idrica - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 156.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 468.00
                                                    },
                                                    {
                                                        "id": 270,
                                                        "description": "a detrarre porta Centrale Idrica",
                                                        "larghezza": 7.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 21.00,
                                                        "quantita": -147.00
                                                    },
                                                    {
                                                        "id": 271,
                                                        "description": "parete - Vano scala - Involucro 532 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 12.00,
                                                        "quantita": 3.00
                                                    },
                                                    {
                                                        "id": 272,
                                                        "description": "parete - Vano scala - Involucro 414 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 12.00,
                                                        "quantita": 3.00
                                                    },
                                                    {
                                                        "id": 273,
                                                        "description": "parete - Amb Servizi - CT - Edificio C - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 293.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 879.00
                                                    },
                                                    {
                                                        "id": 274,
                                                        "description": "a detrarre porta CT - Edificio C",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 21.00,
                                                        "quantita": -168.00
                                                    },
                                                    {
                                                        "id": 275,
                                                        "description": "parete - App02 - PT - Cucina - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 228.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 684.00
                                                    },
                                                    {
                                                        "id": 276,
                                                        "description": "a detrarre finestra Cucina",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -336.00
                                                    },
                                                    {
                                                        "id": 277,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 472.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1416.00
                                                    },
                                                    {
                                                        "id": 278,
                                                        "description": "parete - Vano scala - Involucro 277 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 55.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 165.00
                                                    },
                                                    {
                                                        "id": 279,
                                                        "description": "parete - Vano scala - Involucro 386 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 88.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 280,
                                                        "description": "parete - App01 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 141.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 423.00
                                                    },
                                                    {
                                                        "id": 281,
                                                        "description": "parete - Vano scala - Involucro 393 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 258.00
                                                    },
                                                    {
                                                        "id": 282,
                                                        "description": "parete - App01 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 283,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 284,
                                                        "description": "parete - Vano scala - Involucro 223 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 147.00
                                                    },
                                                    {
                                                        "id": 285,
                                                        "description": "parete - App01 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 41.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 123.00
                                                    },
                                                    {
                                                        "id": 286,
                                                        "description": "parete - App01 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 62.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 186.00
                                                    },
                                                    {
                                                        "id": 287,
                                                        "description": "parete - App01 - PS - Camera - Singola - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 271.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 813.00
                                                    },
                                                    {
                                                        "id": 288,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 289,
                                                        "description": "parete - App01 - PS - Soggiorno - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 164.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 492.00
                                                    },
                                                    {
                                                        "id": 290,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 291,
                                                        "description": "parete - Vano scala - Involucro 318 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 292,
                                                        "description": "parete - App02 - PS - Soggiorno - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 183.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 549.00
                                                    },
                                                    {
                                                        "id": 293,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 294,
                                                        "description": "parete - App02 - PS - Camera - Singola - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 265.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 795.00
                                                    },
                                                    {
                                                        "id": 295,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 296,
                                                        "description": "parete - Vano scala - Involucro 380 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 297,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 62.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 186.00
                                                    },
                                                    {
                                                        "id": 298,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 26.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 78.00
                                                    },
                                                    {
                                                        "id": 299,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 39.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 117.00
                                                    },
                                                    {
                                                        "id": 300,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 301,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 302,
                                                        "description": "parete - App02 - PS - Camera - Doppia - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 135.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 405.00
                                                    },
                                                    {
                                                        "id": 303,
                                                        "description": "parete - App01 - PS - Soggiorno - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 425.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1275.00
                                                    },
                                                    {
                                                        "id": 304,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 305,
                                                        "description": "parete - Esterne - Soggiorno - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 22.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 66.00
                                                    },
                                                    {
                                                        "id": 306,
                                                        "description": "parete - Esterne - Involucro 1248 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 131.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 393.00
                                                    },
                                                    {
                                                        "id": 307,
                                                        "description": "parete - Esterne - Involucro 1343 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 308,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 485.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1455.00
                                                    },
                                                    {
                                                        "id": 309,
                                                        "description": "parete -  - Involucro 1061 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 88.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 310,
                                                        "description": "parete -  - Involucro 1062 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 258.00
                                                    },
                                                    {
                                                        "id": 311,
                                                        "description": "parete - Esterne - Involucro 1250 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 61.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 183.00
                                                    },
                                                    {
                                                        "id": 312,
                                                        "description": "parete - App01 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 141.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 423.00
                                                    },
                                                    {
                                                        "id": 313,
                                                        "description": "parete - App01 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 36.00
                                                    },
                                                    {
                                                        "id": 314,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 315,
                                                        "description": "parete - Esterne - Involucro 1338 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 147.00
                                                    },
                                                    {
                                                        "id": 316,
                                                        "description": "parete - App01 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 42.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 126.00
                                                    },
                                                    {
                                                        "id": 317,
                                                        "description": "parete - App01 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 26.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 78.00
                                                    },
                                                    {
                                                        "id": 318,
                                                        "description": "parete - App01 - PP - Camera - Singola - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 293.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 879.00
                                                    },
                                                    {
                                                        "id": 319,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 320,
                                                        "description": "parete - App01 - PP - Soggiorno - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 145.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 435.00
                                                    },
                                                    {
                                                        "id": 321,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 322,
                                                        "description": "parete - Esterne - Involucro 1155 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 323,
                                                        "description": "parete - App02 - PP - Soggiorno - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 147.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 441.00
                                                    },
                                                    {
                                                        "id": 324,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 325,
                                                        "description": "parete - App02 - PP - Camera - Singola - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 284.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 852.00
                                                    },
                                                    {
                                                        "id": 326,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 327,
                                                        "description": "parete - Esterne - Involucro 1184 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 328,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 26.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 78.00
                                                    },
                                                    {
                                                        "id": 329,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 65.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 195.00
                                                    },
                                                    {
                                                        "id": 330,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 39.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 117.00
                                                    },
                                                    {
                                                        "id": 331,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 332,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 333,
                                                        "description": "parete - App02 - PP - Camera - Doppia - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 334,
                                                        "description": "parete - App01 - PP - Soggiorno - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 414.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 1366.00
                                                    },
                                                    {
                                                        "id": 335,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 336,
                                                        "description": "parete - App02 - PP - Soggiorno - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 446.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1338.00
                                                    },
                                                    {
                                                        "id": 337,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 338,
                                                        "description": "parete - Vano scala - Involucro 837 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 152.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 456.00
                                                    },
                                                    {
                                                        "id": 339,
                                                        "description": "parete - Vano scala - Involucro 771 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 340,
                                                        "description": "parete - Vano scala - Involucro 717 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 88.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 341,
                                                        "description": "parete - Vano scala - Involucro 757 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 258.00
                                                    },
                                                    {
                                                        "id": 342,
                                                        "description": "parete - Vano scala - Involucro 1366 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 61.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 183.00
                                                    },
                                                    {
                                                        "id": 343,
                                                        "description": "parete - App01 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 319.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 957.00
                                                    },
                                                    {
                                                        "id": 344,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -264.00
                                                    },
                                                    {
                                                        "id": 345,
                                                        "description": "parete - Vano scala - Involucro 773 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 55.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 165.00
                                                    },
                                                    {
                                                        "id": 346,
                                                        "description": "parete - App01 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 81.00
                                                    },
                                                    {
                                                        "id": 347,
                                                        "description": "parete - App01 - PT - Soggiorno - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 274.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 822.00
                                                    },
                                                    {
                                                        "id": 348,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 349,
                                                        "description": "parete - App01 - PT - Soggiorno - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 191.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 573.00
                                                    },
                                                    {
                                                        "id": 350,
                                                        "description": "parete - Vano scala - Ingresso - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 228.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 684.00
                                                    },
                                                    {
                                                        "id": 351,
                                                        "description": "a detrarre porta Ingresso",
                                                        "larghezza": 2.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": -54.00
                                                    },
                                                    {
                                                        "id": 352,
                                                        "description": "parete - Vano scala - Vano scala - Edificio C - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 172.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 516.00
                                                    },
                                                    {
                                                        "id": 353,
                                                        "description": "parete - Vano scala - Involucro 761 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 354,
                                                        "description": "parete - App02 - PT - Camera - Singola - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 265.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 795.00
                                                    },
                                                    {
                                                        "id": 355,
                                                        "description": "a detrarre finestra Camera - Singola",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 356,
                                                        "description": "parete - Vano scala - Involucro 763 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 357,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 84.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 252.00
                                                    },
                                                    {
                                                        "id": 358,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 39.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 117.00
                                                    },
                                                    {
                                                        "id": 359,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 13.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 360,
                                                        "description": "a detrarre finestra Camera - Doppia",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 361,
                                                        "description": "parete - App02 - PT - Camera - Doppia - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 135.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 405.00
                                                    },
                                                    {
                                                        "id": 362,
                                                        "description": "parete - App02 - PT - Soggiorno - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 152.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 456.00
                                                    },
                                                    {
                                                        "id": 363,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": -288.00
                                                    },
                                                    {
                                                        "id": 364,
                                                        "description": "parete - App02 - PT - Soggiorno - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 453.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1359.00
                                                    },
                                                    {
                                                        "id": 365,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 366,
                                                        "description": "parete - Vano scala - Vano scala - Edificio C - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 137.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 411.00
                                                    },
                                                    {
                                                        "id": 367,
                                                        "description": "parete - Vano scala - Vano scala - Edificio C - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 149.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 447.00
                                                    },
                                                    {
                                                        "id": 368,
                                                        "description": "parete - Vano scala - Involucro 896 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 258.00
                                                    },
                                                    {
                                                        "id": 369,
                                                        "description": "parete - Vano scala - Involucro 1404 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 55.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 165.00
                                                    },
                                                    {
                                                        "id": 370,
                                                        "description": "parete - Vano scala - Involucro 938 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 55.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 165.00
                                                    },
                                                    {
                                                        "id": 371,
                                                        "description": "parete - Vano scala - Involucro 1406 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 88.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 372,
                                                        "description": "parete - Vano scala - Involucro 1405 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 373,
                                                        "description": "parete - Vano scala - Involucro 895 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 25.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 75.00
                                                    },
                                                    {
                                                        "id": 374,
                                                        "description": "parete - App02 - PS - Soggiorno - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 442.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1326.00
                                                    },
                                                    {
                                                        "id": 375,
                                                        "description": "a detrarre finestra Soggiorno",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": -112.00
                                                    },
                                                    {
                                                        "id": 376,
                                                        "description": "parete - Copertura - Involucro 115 - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 95.00
                                                    },
                                                    {
                                                        "id": 377,
                                                        "description": "",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 378,
                                                        "description": "rimozione tinteggiatura esistente nelle solo parti ammalorate - intervento su entrambe le facce della pareti tipo interno logge, muretti/paretine al piano terra ecc... (pareti esterne che non confinano con ambienti riscaldati e/o interni all'edificio)",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 379,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 284.00,
                                                        "hPeso": 13.00,
                                                        "quantita": 738.00
                                                    },
                                                    {
                                                        "id": 380,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 266.00,
                                                        "hPeso": 13.00,
                                                        "quantita": 692.00
                                                    },
                                                    {
                                                        "id": 381,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 324.00
                                                    },
                                                    {
                                                        "id": 382,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 17.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 34.00
                                                    },
                                                    {
                                                        "id": 383,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 324.00
                                                    },
                                                    {
                                                        "id": 384,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 175.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 35.00
                                                    },
                                                    {
                                                        "id": 385,
                                                        "description": "parete - App01 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 165.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 99.00
                                                    },
                                                    {
                                                        "id": 386,
                                                        "description": "parete - App01 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 163.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 978.00
                                                    },
                                                    {
                                                        "id": 387,
                                                        "description": "parete - App02 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 159.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 954.00
                                                    },
                                                    {
                                                        "id": 388,
                                                        "description": "parete - App02 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 171.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1026.00
                                                    },
                                                    {
                                                        "id": 389,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 36.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 72.00
                                                    },
                                                    {
                                                        "id": 390,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 96.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 192.00
                                                    },
                                                    {
                                                        "id": 391,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 12.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 24.00
                                                    },
                                                    {
                                                        "id": 392,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 148.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 296.00
                                                    },
                                                    {
                                                        "id": 393,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 148.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 296.00
                                                    },
                                                    {
                                                        "id": 394,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 15.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 3.00
                                                    },
                                                    {
                                                        "id": 395,
                                                        "description": "parete - App02 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 29.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 174.00
                                                    },
                                                    {
                                                        "id": 396,
                                                        "description": "parete - App02 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 171.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1026.00
                                                    },
                                                    {
                                                        "id": 397,
                                                        "description": "parete - App01 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 163.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 978.00
                                                    },
                                                    {
                                                        "id": 398,
                                                        "description": "parete - App01 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 165.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 99.00
                                                    },
                                                    {
                                                        "id": 399,
                                                        "description": "parete - App02 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 159.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 954.00
                                                    },
                                                    {
                                                        "id": 400,
                                                        "description": "parete - App02 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 29.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 174.00
                                                    },
                                                    {
                                                        "id": 401,
                                                        "description": "parete - App02 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 159.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 954.00
                                                    },
                                                    {
                                                        "id": 402,
                                                        "description": "parete - App01 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 165.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 99.00
                                                    },
                                                    {
                                                        "id": 403,
                                                        "description": "parete - App02 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 171.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1026.00
                                                    },
                                                    {
                                                        "id": 404,
                                                        "description": "parete - App01 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 163.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 978.00
                                                    },
                                                    {
                                                        "id": 405,
                                                        "description": "parete - App02 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 26.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 156.00
                                                    },
                                                    {
                                                        "id": 406,
                                                        "description": "parete - App02 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 164.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 984.00
                                                    },
                                                    {
                                                        "id": 407,
                                                        "description": "parete - App01 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 171.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1026.00
                                                    },
                                                    {
                                                        "id": 408,
                                                        "description": "parete - App01 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 167.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1002.00
                                                    },
                                                    {
                                                        "id": 409,
                                                        "description": "parete - App02 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 172.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1032.00
                                                    },
                                                    {
                                                        "id": 410,
                                                        "description": "parete - App02 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 29.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 174.00
                                                    },
                                                    {
                                                        "id": 411,
                                                        "description": "parete - App01 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 412,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 189.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 378.00
                                                    },
                                                    {
                                                        "id": 413,
                                                        "description": "parete - App02 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 252.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1512.00
                                                    },
                                                    {
                                                        "id": 414,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 336.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 672.00
                                                    },
                                                    {
                                                        "id": 415,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 233.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 466.00
                                                    },
                                                    {
                                                        "id": 416,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 175.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 35.00
                                                    },
                                                    {
                                                        "id": 417,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 252.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 504.00
                                                    },
                                                    {
                                                        "id": 418,
                                                        "description": "parete - App02 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 282.00,
                                                        "hPeso": 2.00,
                                                        "quantita": 1128.00
                                                    },
                                                    {
                                                        "id": 419,
                                                        "description": "parete - App01 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 251.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1506.00
                                                    },
                                                    {
                                                        "id": 420,
                                                        "description": "parete - App02 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 259.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1554.00
                                                    },
                                                    {
                                                        "id": 421,
                                                        "description": "parete - Amb Servizi - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 106.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 636.00
                                                    },
                                                    {
                                                        "id": 422,
                                                        "description": "parete - Amb Servizi - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 102.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 612.00
                                                    },
                                                    {
                                                        "id": 423,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 442.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 884.00
                                                    },
                                                    {
                                                        "id": 424,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 416.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 832.00
                                                    },
                                                    {
                                                        "id": 425,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 98.00
                                                    },
                                                    {
                                                        "id": 426,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 98.00
                                                    },
                                                    {
                                                        "id": 427,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 81.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 428,
                                                        "description": "parete - App01 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 772.00,
                                                        "hPeso": 8.00,
                                                        "quantita": 1235.00
                                                    },
                                                    {
                                                        "id": 429,
                                                        "description": "parete - App02 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 657.00,
                                                        "hPeso": 8.00,
                                                        "quantita": 1051.00
                                                    },
                                                    {
                                                        "id": 430,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 8.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 16.00
                                                    },
                                                    {
                                                        "id": 431,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 267.00,
                                                        "hPeso": 13.00,
                                                        "quantita": 694.00
                                                    },
                                                    {
                                                        "id": 432,
                                                        "description": "parete - Copertura - Piano quinto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 3.00,
                                                        "hPeso": 13.00,
                                                        "quantita": 78.00
                                                    },
                                                    {
                                                        "id": 433,
                                                        "description": "parete - App01 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 434,
                                                        "description": "parete - App02 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 435,
                                                        "description": "parete - App01 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 436,
                                                        "description": "parete - App02 - PQ - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 437,
                                                        "description": "parete - App01 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 251.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1506.00
                                                    },
                                                    {
                                                        "id": 438,
                                                        "description": "parete - App02 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 259.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1554.00
                                                    },
                                                    {
                                                        "id": 439,
                                                        "description": "parete - App02 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 440,
                                                        "description": "parete - App02 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 441,
                                                        "description": "parete - App01 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 442,
                                                        "description": "parete - App01 - PTer - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 443,
                                                        "description": "parete - App01 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 251.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1506.00
                                                    },
                                                    {
                                                        "id": 444,
                                                        "description": "parete - App02 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 259.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 1554.00
                                                    },
                                                    {
                                                        "id": 445,
                                                        "description": "parete - App01 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 446,
                                                        "description": "parete - App01 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 447,
                                                        "description": "parete - App02 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 448,
                                                        "description": "parete - App02 - PS - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 95.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 57.00
                                                    },
                                                    {
                                                        "id": 449,
                                                        "description": "parete - App02 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 249.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 1643.00
                                                    },
                                                    {
                                                        "id": 450,
                                                        "description": "parete - App01 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 235.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 1551.00
                                                    },
                                                    {
                                                        "id": 451,
                                                        "description": "parete - App01 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 452,
                                                        "description": "parete - App02 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 453,
                                                        "description": "parete - App01 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 92.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 552.00
                                                    },
                                                    {
                                                        "id": 454,
                                                        "description": "parete - App02 - PP - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 21.00,
                                                        "hPeso": 33.00,
                                                        "quantita": 139.00
                                                    },
                                                    {
                                                        "id": 455,
                                                        "description": "parete - App01 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 162.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 972.00
                                                    },
                                                    {
                                                        "id": 456,
                                                        "description": "parete - App02 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 252.00,
                                                        "hPeso": 2.00,
                                                        "quantita": 1008.00
                                                    },
                                                    {
                                                        "id": 457,
                                                        "description": "parete - App01 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 65.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 39.00
                                                    },
                                                    {
                                                        "id": 458,
                                                        "description": "parete - App02 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 49.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 294.00
                                                    },
                                                    {
                                                        "id": 459,
                                                        "description": "parete - App01 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 62.00,
                                                        "hPeso": 3.00,
                                                        "quantita": 372.00
                                                    },
                                                    {
                                                        "id": 460,
                                                        "description": "parete - App02 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 8.00,
                                                        "hPeso": 27.00,
                                                        "quantita": 432.00
                                                    },
                                                    {
                                                        "id": 461,
                                                        "description": "parete - Rampa esterna - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 27.00,
                                                        "hPeso": 2.00,
                                                        "quantita": 108.00
                                                    },
                                                    {
                                                        "id": 462,
                                                        "description": "parete - App01 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 57.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 114.00
                                                    },
                                                    {
                                                        "id": 463,
                                                        "description": "parete - App02 - PT - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 607.00,
                                                        "hPeso": 1.00,
                                                        "quantita": 1214.00
                                                    },
                                                    {
                                                        "id": 464,
                                                        "description": "parete - Rampa esterna - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 86.00,
                                                        "hPeso": 163.00,
                                                        "quantita": 2804.00
                                                    },
                                                    {
                                                        "id": 465,
                                                        "description": "",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 466,
                                                        "description": "- Vedi voce N.5 [mq 38,84]",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 3884.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 7,
                                                "description": "",
                                                "unit": "m",
                                                "price": 3.15,
                                                "code": "E.002.043.a",
                                                "measurements": [
                                                    {
                                                        "id": 467,
                                                        "description": "rimozione zoccolino battiscopa negli ambienti in cui realizzare la controparete di isolmento - Ã¨ computato il perimetro delle due stanze di confine",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 468,
                                                        "description": "Camera - Doppia - sommano n piani * m",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 1569.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 7845.00
                                                    },
                                                    {
                                                        "id": 469,
                                                        "description": "a detrarre porta",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 8.00,
                                                        "hPeso": 0.00,
                                                        "quantita": -4.00
                                                    },
                                                    {
                                                        "id": 470,
                                                        "description": "a detrarre balcone",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 11.00,
                                                        "hPeso": 0.00,
                                                        "quantita": -55.00
                                                    },
                                                    {
                                                        "id": 471,
                                                        "description": "Camera - Doppia - sommano n piani * m",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 153.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 765.00
                                                    },
                                                    {
                                                        "id": 472,
                                                        "description": "a detrarre porta",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 8.00,
                                                        "hPeso": 0.00,
                                                        "quantita": -4.00
                                                    },
                                                    {
                                                        "id": 473,
                                                        "description": "a detrarre balcone",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 11.00,
                                                        "hPeso": 0.00,
                                                        "quantita": -55.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 8,
                                                "description": "",
                                                "unit": "mq",
                                                "price": 26.20,
                                                "code": "E.002.057.b",
                                                "measurements": [
                                                    {
                                                        "id": 474,
                                                        "description": "rimozione infissi Scala C",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 475,
                                                        "description": "finestra Bagno - Piano quarto - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 476,
                                                        "description": "finestra Cucina - Piano quarto - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 477,
                                                        "description": "finestra Bagno - Piano quarto - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 478,
                                                        "description": "finestra Cucina - Piano quarto - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 479,
                                                        "description": "finestra Camera - Doppia - Piano quarto - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 480,
                                                        "description": "finestra Camera - Doppia - Piano quarto - App 02",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 481,
                                                        "description": "finestra Sala da pranzo - Piano quarto - App 02",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 482,
                                                        "description": "finestra Sala da pranzo - Piano quarto - App 01",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 483,
                                                        "description": "finestra Bagno - Piano terzo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 484,
                                                        "description": "finestra Cucina - Piano terzo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 485,
                                                        "description": "finestra Bagno - Piano terzo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 486,
                                                        "description": "finestra Cucina - Piano terzo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 487,
                                                        "description": "finestra Camera - Doppia - Piano terzo - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 488,
                                                        "description": "finestra Camera - Doppia - Piano terzo - App 02",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 489,
                                                        "description": "finestra Sala da pranzo - Piano terzo - App 01",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 490,
                                                        "description": "finestra Sala da pranzo - Piano terzo - App 02",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 491,
                                                        "description": "finestra Camera - Doppia - Piano secondo - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 492,
                                                        "description": "finestra Bagno - Piano secondo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 493,
                                                        "description": "finestra Cucina - Piano secondo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 494,
                                                        "description": "finestra Camera - Doppia - Piano secondo - App 02",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 495,
                                                        "description": "finestra Bagno - Piano secondo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 496,
                                                        "description": "finestra Cucina - Piano secondo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 497,
                                                        "description": "finestra Sala da pranzo - Piano secondo - App 01",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 498,
                                                        "description": "finestra Sala da pranzo - Piano secondo - App 02",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 499,
                                                        "description": "finestra Sala da pranzo - Piano primo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 500,
                                                        "description": "finestra Bagno - Piano primo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 501,
                                                        "description": "finestra Bagno - Piano primo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 502,
                                                        "description": "finestra Camera - Doppia - Piano primo - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 503,
                                                        "description": "finestra Sala da pranzo - Piano primo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 504,
                                                        "description": "finestra Camera - Doppia / Camera - Doppia - Piano primo - App 02",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 505,
                                                        "description": "finestra Camera - Doppia - Piano quarto - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 506,
                                                        "description": "finestra Camera - Singola - Piano quarto - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 507,
                                                        "description": "finestra Camera - Singola - Piano quarto - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 508,
                                                        "description": "finestra Camera - Doppia - Piano quarto - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 509,
                                                        "description": "finestra Sala da pranzo - Piano primo - App 02",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 510,
                                                        "description": "finestra Sala da pranzo - Piano primo - App 01",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 511,
                                                        "description": "finestra Soggiorno - Piano quarto - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 512,
                                                        "description": "finestra Soggiorno - Piano quarto - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 513,
                                                        "description": "finestra Cucina - Piano Terra - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 514,
                                                        "description": "finestra Bagno - Piano Terra - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 515,
                                                        "description": "finestra Camera - Doppia - Piano Terra - App 02",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 516,
                                                        "description": "finestra Camera - Doppia - Piano Terra - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 517,
                                                        "description": "finestra Bagno - Piano Terra - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 518,
                                                        "description": "finestra Cucina - Piano Terra - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 519,
                                                        "description": "finestra Soggiorno - Piano quarto - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 520,
                                                        "description": "finestra Soggiorno - Piano quarto - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 521,
                                                        "description": "finestra Involucro 42 - Piano quinto - Vano scala",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 2.00,
                                                        "quantita": 12.00
                                                    },
                                                    {
                                                        "id": 522,
                                                        "description": "finestra Camera - Singola - Piano terzo - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 523,
                                                        "description": "finestra Camera - Doppia - Piano terzo - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 524,
                                                        "description": "finestra Camera - Singola - Piano terzo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 525,
                                                        "description": "finestra Camera - Doppia - Piano terzo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 526,
                                                        "description": "finestra Cucina - Piano Terra - App 02",
                                                        "larghezza": 14.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 527,
                                                        "description": "finestra Soggiorno - Piano terzo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 528,
                                                        "description": "finestra Soggiorno - Piano terzo - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 529,
                                                        "description": "finestra Soggiorno - Piano terzo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 530,
                                                        "description": "finestra Soggiorno - Piano terzo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 531,
                                                        "description": "finestra Vano scala - Edificio C - Piano terzo - Vano scala",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 532,
                                                        "description": "finestra Camera - Singola - Piano secondo - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 533,
                                                        "description": "finestra Camera - Doppia - Piano secondo - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 534,
                                                        "description": "finestra Camera - Singola - Piano secondo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 535,
                                                        "description": "finestra Camera - Doppia - Piano secondo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 536,
                                                        "description": "finestra Soggiorno - Piano secondo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 537,
                                                        "description": "finestra Soggiorno - Piano secondo - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 538,
                                                        "description": "finestra Soggiorno - Piano secondo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 539,
                                                        "description": "finestra Soggiorno - Piano secondo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 540,
                                                        "description": "finestra Vano scala - Edificio C - Piano secondo - Vano scala",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 541,
                                                        "description": "finestra Camera - Singola - Piano primo - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 542,
                                                        "description": "finestra Camera - Doppia - Piano primo - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 543,
                                                        "description": "finestra Camera - Doppia - Piano primo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 544,
                                                        "description": "finestra Camera - Singola - Piano primo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 545,
                                                        "description": "finestra Soggiorno - Piano primo - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 546,
                                                        "description": "finestra Soggiorno - Piano primo - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 547,
                                                        "description": "finestra Soggiorno - Piano primo - App 01",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 548,
                                                        "description": "finestra Soggiorno - Piano primo - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 549,
                                                        "description": "finestra Vano scala - Edificio C - Piano primo - Vano scala",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": 162.00
                                                    },
                                                    {
                                                        "id": 550,
                                                        "description": "finestra Camera - Doppia - Piano Terra - App 01",
                                                        "larghezza": 11.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 551,
                                                        "description": "finestra Soggiorno - Piano Terra - App 01",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 552,
                                                        "description": "finestra Camera - Singola - Piano Terra - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 553,
                                                        "description": "finestra Camera - Doppia - Piano Terra - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 554,
                                                        "description": "finestra Soggiorno - Piano Terra - App 02",
                                                        "larghezza": 12.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 24.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 555,
                                                        "description": "finestra Soggiorno - Piano Terra - App 02",
                                                        "larghezza": 8.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 14.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 556,
                                                        "description": "finestra Vano scala - Edificio C - Piano Terra - Vano scala",
                                                        "larghezza": 6.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": 162.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 9,
                                                "description": "",
                                                "unit": "mq",
                                                "price": 26.20,
                                                "code": "E.002.057.b",
                                                "measurements": [
                                                    {
                                                        "id": 557,
                                                        "description": "rimozione porta di ingresso - scala C",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 558,
                                                        "description": "Ingresso - Piano Terra",
                                                        "larghezza": 2.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 27.00,
                                                        "quantita": 54.00
                                                    },
                                                    {
                                                        "id": 559,
                                                        "description": "rimozione porte di servizio - scala C",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 0.00
                                                    },
                                                    {
                                                        "id": 560,
                                                        "description": "porte accesso copertura - Piano quinto",
                                                        "larghezza": 9.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 21.00,
                                                        "quantita": 189.00
                                                    },
                                                    {
                                                        "id": 561,
                                                        "description": "porta accesso vano tecnico ascensore - Piano quinto",
                                                        "larghezza": 9.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 21.00,
                                                        "quantita": 189.00
                                                    }
                                                ]
                                            },
                                            {
                                                "id": 10,
                                                "description": "",
                                                "unit": "mq",
                                                "price": 15.00,
                                                "code": "E.002.059",
                                                "measurements": [
                                                    {
                                                        "id": 562,
                                                        "description": "finestra - Bagno - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 563,
                                                        "description": "finestra - Cucina - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 564,
                                                        "description": "finestra - Bagno - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 565,
                                                        "description": "finestra - Cucina - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 566,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 567,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 568,
                                                        "description": "finestra - Sala da pranzo - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 569,
                                                        "description": "finestra - Sala da pranzo - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 570,
                                                        "description": "finestra - Bagno - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 571,
                                                        "description": "finestra - Cucina - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 572,
                                                        "description": "finestra - Bagno - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 573,
                                                        "description": "finestra - Cucina - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 574,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 575,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 576,
                                                        "description": "finestra - Sala da pranzo - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 577,
                                                        "description": "finestra - Sala da pranzo - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 578,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 579,
                                                        "description": "finestra - Bagno - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 580,
                                                        "description": "finestra - Cucina - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 581,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 582,
                                                        "description": "finestra - Bagno - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 583,
                                                        "description": "finestra - Cucina - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 584,
                                                        "description": "finestra - Sala da pranzo - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 585,
                                                        "description": "finestra - Sala da pranzo - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 586,
                                                        "description": "finestra - Sala da pranzo - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 587,
                                                        "description": "finestra - Bagno - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 588,
                                                        "description": "finestra - Bagno - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 589,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 590,
                                                        "description": "finestra - Sala da pranzo - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 591,
                                                        "description": "finestra - Camera - Doppia / Camera - Doppia - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 592,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 593,
                                                        "description": "finestra - Camera - Singola - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 594,
                                                        "description": "finestra - Camera - Singola - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 595,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 596,
                                                        "description": "finestra - Sala da pranzo - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 597,
                                                        "description": "finestra - Sala da pranzo - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 598,
                                                        "description": "finestra - Soggiorno - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 599,
                                                        "description": "finestra - Soggiorno - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 600,
                                                        "description": "finestra - Cucina - App 01 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 601,
                                                        "description": "finestra - Bagno - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 602,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 603,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 604,
                                                        "description": "finestra - Bagno - App 01 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 605,
                                                        "description": "finestra - Cucina - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 606,
                                                        "description": "finestra - Soggiorno - App 01 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 607,
                                                        "description": "finestra - Soggiorno - App 02 - Piano quarto",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 608,
                                                        "description": "finestra - Camera - Singola - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 609,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 610,
                                                        "description": "finestra - Camera - Singola - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 611,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 612,
                                                        "description": "finestra - Cucina - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 336.00
                                                    },
                                                    {
                                                        "id": 613,
                                                        "description": "finestra - Soggiorno - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 614,
                                                        "description": "finestra - Soggiorno - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 615,
                                                        "description": "finestra - Soggiorno - App 02 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 616,
                                                        "description": "finestra - Soggiorno - App 01 - Piano terzo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 617,
                                                        "description": "finestra - Camera - Singola - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 618,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 619,
                                                        "description": "finestra - Camera - Singola - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 620,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 621,
                                                        "description": "finestra - Soggiorno - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 622,
                                                        "description": "finestra - Soggiorno - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 623,
                                                        "description": "finestra - Soggiorno - App 02 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 624,
                                                        "description": "finestra - Soggiorno - App 01 - Piano secondo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 625,
                                                        "description": "finestra - Camera - Singola - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 626,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 627,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 628,
                                                        "description": "finestra - Camera - Singola - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 629,
                                                        "description": "finestra - Soggiorno - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 630,
                                                        "description": "finestra - Soggiorno - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 631,
                                                        "description": "finestra - Soggiorno - App 01 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 632,
                                                        "description": "finestra - Soggiorno - App 02 - Piano primo",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    },
                                                    {
                                                        "id": 633,
                                                        "description": "finestra - Camera - Doppia - App 01 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 264.00
                                                    },
                                                    {
                                                        "id": 634,
                                                        "description": "finestra - Soggiorno - App 01 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 635,
                                                        "description": "finestra - Camera - Singola - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 636,
                                                        "description": "finestra - Camera - Doppia - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 637,
                                                        "description": "finestra - Soggiorno - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 288.00
                                                    },
                                                    {
                                                        "id": 638,
                                                        "description": "finestra - Soggiorno - App 02 - Piano Terra",
                                                        "larghezza": 0.00,
                                                        "lunghezza": 0.00,
                                                        "hPeso": 0.00,
                                                        "quantita": 112.00
                                                    }
                                                ]
                                            }
                                        ],
                                        "children": [],
                                        "hasEntry": true
                                    }
                                ],
                                "hasEntry": false
                            }
                        ],
                        "hasEntry": false
                    },
                    {
                        "id": 2,
                        "description": "Scala D",
                        "originalId": 2,
                        "parentId": 1,
                        "level": 2,
                        "entries": [],
                        "children": [],
                        "hasEntry": false
                    }
                ],
                "hasEntry": false
            }
        ],
        "subjects": null
    },
    currentProject: null,
    currentProjectId: null
};

const slice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // SET IMPORTED PROJECT
        setImportedProjectSuccess(state, action) {
            state.currentImportedProject = action.payload;
        },

        // CLEAR IMPORTED PROJECT
        clearImportedProjectSuccess(state) {
            state.currentImportedProject = null;
        },

        // SET CURRENT PROJECT
        setCurrentProjectSuccess(state, action) {
            state.currentProject = action.payload;
        },

        // SET CURRENT PROJECT ID
        setCurrentProjectIdSuccess(state, action) {
            state.currentProjectId = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ⬇️ Redux Thunks

// Imposta il progetto importato
export function setImportedProject(project) {
    return async () => {
        try {
            dispatch(slice.actions.setImportedProjectSuccess(project));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Cancella il progetto importato
export function clearImportedProject() {
    return async () => {
        try {
            dispatch(slice.actions.clearImportedProjectSuccess());
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Imposta il progetto corrente
export function setCurrentProject(project) {
    return async () => {
        try {
            dispatch(slice.actions.setCurrentProjectSuccess(project));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Imposta l'ID del progetto corrente
export function setCurrentProjectId(projectId) {
    return async () => {
        try {
            dispatch(slice.actions.setCurrentProjectIdSuccess(projectId));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
