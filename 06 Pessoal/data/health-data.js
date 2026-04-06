/**
 * health-data.js — Fonte única de verdade para o dashboard de saúde.
 * Atualizado pelo agente de check-in toda semana (domingo).
 * v2.1 — 2026-04-06: histórico completo importado do RelaxFit (Davidson 31 medições, Isabella 17 medições)
 */
const HEALTH_DATA = {
  "meta": {
    "updated": "2026-03-13",
    "version": "2.1"
  },
  "pessoas": {
    "davidson": {
      "nome": "Davidson",
      "color": "#38bdf8",
      "colorDim": "rgba(56,189,248,.12)",
      "muscle_label": "Taxa muscular",
      "baseline": {
        "date": "2026-02-04",
        "weight_kg": 102.5,
        "fat_pct": 26.8,
        "subcutaneous_fat_pct": 22.9,
        "skeletal_muscle_pct": 69.5,
        "muscle_mass_kg": 71.24,
        "bone_mass_kg": 3.75,
        "protein_pct": 16.7,
        "visceral": 13.4,
        "bmi": 30.9,
        "water_pct": 52.8,
        "bmr_kcal": 1989,
        "body_age": 31
      },
      "goals": {
        "fat_pct_target": 15,
        "fat_pct_intermediate": 20
      },
      "treatment": {
        "label": "Mounjaro",
        "current": "2.5mg",
        "application_day": "quinta-feira"
      },
      "symptoms_schema": {
        "nausea": "Náusea",
        "reflux": "Refluxo",
        "constipation": "Constipação",
        "diarrhea": "Diarreia",
        "bloating": "Inchaço",
        "headache": "Dor de cabeça",
        "fatigue": "Cansaço",
        "low_energy": "Baixa energia",
        "anxiety_stress": "Ansiedade",
        "poor_sleep": "Sono ruim"
      },
      "history": [
        {
          "date": "2026-01-01",
          "weight_kg": 103.5,
          "fat_pct": 27.5,
          "subcutaneous_fat_pct": null,
          "skeletal_muscle_pct": null,
          "muscle_mass_kg": null,
          "bone_mass_kg": null,
          "protein_pct": null,
          "visceral": null,
          "bmi": 31.2,
          "water_pct": null,
          "bmr_kcal": null,
          "body_age": null
        },
        {
          "date": "2026-02-04",
          "weight_kg": 102.5,
          "fat_pct": 26.8,
          "subcutaneous_fat_pct": 22.9,
          "skeletal_muscle_pct": 69.5,
          "muscle_mass_kg": 71.24,
          "bone_mass_kg": 3.75,
          "protein_pct": 16.7,
          "visceral": 13.4,
          "bmi": 30.9,
          "water_pct": 52.8,
          "bmr_kcal": 1989,
          "body_age": 31
        },
        {
          "date": "2026-02-05",
          "weight_kg": 100.7,
          "fat_pct": 26.1,
          "subcutaneous_fat_pct": 22.3,
          "skeletal_muscle_pct": 70.2,
          "muscle_mass_kg": 70.72,
          "bone_mass_kg": 3.72,
          "protein_pct": 16.9,
          "visceral": 13,
          "bmi": 30.4,
          "water_pct": 53.4,
          "bmr_kcal": 1977,
          "body_age": 31
        },
        {
          "date": "2026-02-06",
          "weight_kg": 100.6,
          "fat_pct": 26.1,
          "subcutaneous_fat_pct": 22.3,
          "skeletal_muscle_pct": 70.2,
          "muscle_mass_kg": 70.65,
          "bone_mass_kg": 3.72,
          "protein_pct": 16.9,
          "visceral": 13,
          "bmi": 30.4,
          "water_pct": 53.4,
          "bmr_kcal": 1976,
          "body_age": 31
        },
        {
          "date": "2026-02-07",
          "weight_kg": 100.9,
          "fat_pct": 26.2,
          "subcutaneous_fat_pct": 22.4,
          "skeletal_muscle_pct": 70.1,
          "muscle_mass_kg": 70.71,
          "bone_mass_kg": 3.72,
          "protein_pct": 16.8,
          "visceral": 13.1,
          "bmi": 30.5,
          "water_pct": 53.3,
          "bmr_kcal": 1977,
          "body_age": 31
        },
        {
          "date": "2026-02-08",
          "weight_kg": 100.6,
          "fat_pct": 26.1,
          "subcutaneous_fat_pct": 22.3,
          "skeletal_muscle_pct": 70.2,
          "muscle_mass_kg": 70.65,
          "bone_mass_kg": 3.72,
          "protein_pct": 16.9,
          "visceral": 13,
          "bmi": 30.4,
          "water_pct": 53.4,
          "bmr_kcal": 1976,
          "body_age": 31
        },
        {
          "date": "2026-02-10",
          "weight_kg": 99.25,
          "fat_pct": 25.5,
          "subcutaneous_fat_pct": 21.8,
          "skeletal_muscle_pct": 70.8,
          "muscle_mass_kg": 70.28,
          "bone_mass_kg": 3.7,
          "protein_pct": 17,
          "visceral": 12.6,
          "bmi": 30,
          "water_pct": 53.8,
          "bmr_kcal": 1967,
          "body_age": 30
        },
        {
          "date": "2026-02-11",
          "weight_kg": 99.05,
          "fat_pct": 25.3,
          "subcutaneous_fat_pct": 21.7,
          "skeletal_muscle_pct": 71,
          "muscle_mass_kg": 70.28,
          "bone_mass_kg": 3.7,
          "protein_pct": 17,
          "visceral": 12.5,
          "bmi": 29.9,
          "water_pct": 53.9,
          "bmr_kcal": 1967,
          "body_age": 30
        },
        {
          "date": "2026-02-12",
          "weight_kg": 99.2,
          "fat_pct": 25.3,
          "subcutaneous_fat_pct": 21.7,
          "skeletal_muscle_pct": 71,
          "muscle_mass_kg": 70.38,
          "bone_mass_kg": 3.7,
          "protein_pct": 17,
          "visceral": 12.5,
          "bmi": 29.9,
          "water_pct": 53.9,
          "bmr_kcal": 1970,
          "body_age": 30
        },
        {
          "date": "2026-02-13",
          "weight_kg": 99.3,
          "fat_pct": 25.5,
          "subcutaneous_fat_pct": 21.8,
          "skeletal_muscle_pct": 70.8,
          "muscle_mass_kg": 70.31,
          "bone_mass_kg": 3.7,
          "protein_pct": 17,
          "visceral": 12.6,
          "bmi": 30,
          "water_pct": 53.8,
          "bmr_kcal": 1968,
          "body_age": 30
        },
        {
          "date": "2026-02-14",
          "weight_kg": 99.45,
          "fat_pct": 25.5,
          "subcutaneous_fat_pct": 21.8,
          "skeletal_muscle_pct": 70.8,
          "muscle_mass_kg": 70.41,
          "bone_mass_kg": 3.71,
          "protein_pct": 17,
          "visceral": 12.6,
          "bmi": 30,
          "water_pct": 53.8,
          "bmr_kcal": 1971,
          "body_age": 30
        },
        {
          "date": "2026-02-16",
          "weight_kg": 99.35,
          "fat_pct": 25.5,
          "subcutaneous_fat_pct": 21.8,
          "skeletal_muscle_pct": 70.8,
          "muscle_mass_kg": 70.35,
          "bone_mass_kg": 3.7,
          "protein_pct": 17,
          "visceral": 12.6,
          "bmi": 30,
          "water_pct": 53.8,
          "bmr_kcal": 1969,
          "body_age": 30
        },
        {
          "date": "2026-02-17",
          "weight_kg": 98.8,
          "fat_pct": 25.2,
          "subcutaneous_fat_pct": 21.6,
          "skeletal_muscle_pct": 71.1,
          "muscle_mass_kg": 70.24,
          "bone_mass_kg": 3.7,
          "protein_pct": 17.1,
          "visceral": 12.4,
          "bmi": 29.8,
          "water_pct": 54,
          "bmr_kcal": 1967,
          "body_age": 30
        },
        {
          "date": "2026-02-19",
          "weight_kg": 98.15,
          "fat_pct": 24.9,
          "subcutaneous_fat_pct": 21.3,
          "skeletal_muscle_pct": 71.4,
          "muscle_mass_kg": 70.07,
          "bone_mass_kg": 3.69,
          "protein_pct": 17.1,
          "visceral": 12.2,
          "bmi": 29.6,
          "water_pct": 54.3,
          "bmr_kcal": 1963,
          "body_age": 30
        },
        {
          "date": "2026-02-20",
          "weight_kg": 98,
          "fat_pct": 24.9,
          "subcutaneous_fat_pct": 21.3,
          "skeletal_muscle_pct": 71.4,
          "muscle_mass_kg": 69.96,
          "bone_mass_kg": 3.68,
          "protein_pct": 17.1,
          "visceral": 12.2,
          "bmi": 29.6,
          "water_pct": 54.3,
          "bmr_kcal": 1960,
          "body_age": 30
        },
        {
          "date": "2026-02-24",
          "weight_kg": 97.7,
          "fat_pct": 24.7,
          "subcutaneous_fat_pct": 21.2,
          "skeletal_muscle_pct": 71.5,
          "muscle_mass_kg": 69.89,
          "bone_mass_kg": 3.68,
          "protein_pct": 17.2,
          "visceral": 12.1,
          "bmi": 29.5,
          "water_pct": 54.4,
          "bmr_kcal": 1959,
          "body_age": 30
        },
        {
          "date": "2026-02-26",
          "weight_kg": 97.35,
          "fat_pct": 24.5,
          "subcutaneous_fat_pct": 21,
          "skeletal_muscle_pct": 71.7,
          "muscle_mass_kg": 69.78,
          "bone_mass_kg": 3.67,
          "protein_pct": 17.2,
          "visceral": 12,
          "bmi": 29.4,
          "water_pct": 54.5,
          "bmr_kcal": 1956,
          "body_age": 30
        },
        {
          "date": "2026-02-27",
          "weight_kg": 96.95,
          "fat_pct": 24.4,
          "subcutaneous_fat_pct": 20.9,
          "skeletal_muscle_pct": 71.8,
          "muscle_mass_kg": 69.63,
          "bone_mass_kg": 3.66,
          "protein_pct": 17.2,
          "visceral": 11.9,
          "bmi": 29.3,
          "water_pct": 54.6,
          "bmr_kcal": 1953,
          "body_age": 30
        },
        {
          "date": "2026-03-03",
          "weight_kg": 97.15,
          "fat_pct": 24.4,
          "subcutaneous_fat_pct": 20.9,
          "skeletal_muscle_pct": 71.8,
          "muscle_mass_kg": 69.78,
          "bone_mass_kg": 3.67,
          "protein_pct": 17.2,
          "visceral": 11.9,
          "bmi": 29.3,
          "water_pct": 54.6,
          "bmr_kcal": 1956,
          "body_age": 30
        },
        {
          "date": "2026-03-08",
          "weight_kg": 96.75,
          "fat_pct": 24.3,
          "subcutaneous_fat_pct": 20.9,
          "skeletal_muscle_pct": 71.9,
          "muscle_mass_kg": 69.53,
          "bone_mass_kg": 3.66,
          "protein_pct": 17.2,
          "visceral": 11.8,
          "bmi": 29.2,
          "water_pct": 54.6,
          "bmr_kcal": 1950,
          "body_age": 31
        },
        {
          "date": "2026-03-09",
          "weight_kg": 95.65,
          "fat_pct": 23.9,
          "subcutaneous_fat_pct": 20.5,
          "skeletal_muscle_pct": 72.3,
          "muscle_mass_kg": 69.16,
          "bone_mass_kg": 3.64,
          "protein_pct": 17.4,
          "visceral": 11.6,
          "bmi": 28.9,
          "water_pct": 54.9,
          "bmr_kcal": 1942,
          "body_age": 31
        },
        {
          "date": "2026-03-11",
          "weight_kg": 95.05,
          "fat_pct": 23.6,
          "subcutaneous_fat_pct": 20.3,
          "skeletal_muscle_pct": 72.6,
          "muscle_mass_kg": 69,
          "bone_mass_kg": 3.63,
          "protein_pct": 17.4,
          "visceral": 11.4,
          "bmi": 28.7,
          "water_pct": 55.2,
          "bmr_kcal": 1938,
          "body_age": 30
        },
        {
          "date": "2026-03-13",
          "weight_kg": 95.55,
          "fat_pct": 23.7,
          "subcutaneous_fat_pct": 20.4,
          "skeletal_muscle_pct": 72.5,
          "muscle_mass_kg": 69.23,
          "bone_mass_kg": 3.64,
          "protein_pct": 17.4,
          "visceral": 11.5,
          "bmi": 28.8,
          "water_pct": 55.1,
          "bmr_kcal": 1944,
          "body_age": 30
        },
        {
          "date": "2026-03-14",
          "weight_kg": 94.75,
          "fat_pct": 23.4,
          "subcutaneous_fat_pct": 20.1,
          "skeletal_muscle_pct": 72.7,
          "muscle_mass_kg": 68.92,
          "bone_mass_kg": 3.63,
          "protein_pct": 17.5,
          "visceral": 11.3,
          "bmi": 28.6,
          "water_pct": 55.3,
          "bmr_kcal": 1937,
          "body_age": 30
        },
        {
          "date": "2026-03-19",
          "weight_kg": 94.1,
          "fat_pct": 23.1,
          "subcutaneous_fat_pct": 19.9,
          "skeletal_muscle_pct": 73,
          "muscle_mass_kg": 68.72,
          "bone_mass_kg": 3.62,
          "protein_pct": 17.5,
          "visceral": 11.1,
          "bmi": 28.4,
          "water_pct": 55.5,
          "bmr_kcal": 1932,
          "body_age": 30
        },
        {
          "date": "2026-03-20",
          "weight_kg": 94.1,
          "fat_pct": 23.1,
          "subcutaneous_fat_pct": 19.9,
          "skeletal_muscle_pct": 73,
          "muscle_mass_kg": 68.72,
          "bone_mass_kg": 3.62,
          "protein_pct": 17.5,
          "visceral": 11.1,
          "bmi": 28.4,
          "water_pct": 55.5,
          "bmr_kcal": 1932,
          "body_age": 30
        },
        {
          "date": "2026-03-23",
          "weight_kg": 93.6,
          "fat_pct": 23,
          "subcutaneous_fat_pct": 19.8,
          "skeletal_muscle_pct": 73.2,
          "muscle_mass_kg": 68.49,
          "bone_mass_kg": 3.6,
          "protein_pct": 17.6,
          "visceral": 11,
          "bmi": 28.3,
          "water_pct": 55.6,
          "bmr_kcal": 1927,
          "body_age": 30
        },
        {
          "date": "2026-03-25",
          "weight_kg": 93.1,
          "fat_pct": 22.7,
          "subcutaneous_fat_pct": 19.5,
          "skeletal_muscle_pct": 73.5,
          "muscle_mass_kg": 68.39,
          "bone_mass_kg": 3.6,
          "protein_pct": 17.6,
          "visceral": 10.8,
          "bmi": 28.1,
          "water_pct": 55.8,
          "bmr_kcal": 1925,
          "body_age": 30
        },
        {
          "date": "2026-03-30",
          "weight_kg": 93.1,
          "fat_pct": 22.7,
          "subcutaneous_fat_pct": 19.5,
          "skeletal_muscle_pct": 73.5,
          "muscle_mass_kg": 68.39,
          "bone_mass_kg": 3.6,
          "protein_pct": 17.6,
          "visceral": 10.8,
          "bmi": 28.1,
          "water_pct": 55.8,
          "bmr_kcal": 1925,
          "body_age": 30
        },
        {
          "date": "2026-04-01",
          "weight_kg": 93.45,
          "fat_pct": 22.8,
          "subcutaneous_fat_pct": 19.6,
          "skeletal_muscle_pct": 73.3,
          "muscle_mass_kg": 68.52,
          "bone_mass_kg": 3.61,
          "protein_pct": 17.6,
          "visceral": 10.9,
          "bmi": 28.2,
          "water_pct": 55.7,
          "bmr_kcal": 1927,
          "body_age": 30
        },
        {
          "date": "2026-04-05",
          "weight_kg": 92.75,
          "fat_pct": 22.5,
          "subcutaneous_fat_pct": 19.4,
          "skeletal_muscle_pct": 73.6,
          "muscle_mass_kg": 68.27,
          "bone_mass_kg": 3.59,
          "protein_pct": 17.7,
          "visceral": 10.7,
          "bmi": 28,
          "water_pct": 55.9,
          "bmr_kcal": 1922,
          "body_age": 30
        }
      ],
      "measurements": [
        {
          "date": "2026-02-04",
          "cintura": 107,
          "peito": 114,
          "bracos": 42,
          "ombros": 131,
          "quadril": 110,
          "coxas": 64,
          "panturrilhas": 41
        },
        {
          "date": "2026-03-04",
          "cintura": 103,
          "peito": 112,
          "bracos": 41,
          "ombros": 130,
          "quadril": 108,
          "coxas": 63,
          "panturrilhas": 40
        },
        {
          "date": "2026-04-04",
          "cintura": 100,
          "peito": 110,
          "bracos": 41,
          "ombros": 129,
          "quadril": 107,
          "coxas": 62,
          "panturrilhas": 40
        }
      ]
    },
    "isabella": {
      "nome": "Isabella",
      "color": "#f472b6",
      "colorDim": "rgba(244,114,182,.12)",
      "muscle_label": "Músculo esquelético",
      "baseline": {
        "date": "2026-02-04",
        "weight_kg": 80.55,
        "fat_pct": 38.8,
        "subcutaneous_fat_pct": 33.7,
        "skeletal_muscle_pct": 35.7,
        "muscle_mass_kg": 46.3,
        "bone_mass_kg": 3,
        "protein_pct": 13.6,
        "visceral": 14,
        "bmi": 32.3,
        "water_pct": 42,
        "bmr_kcal": 1434,
        "body_age": 33
      },
      "goals": {
        "fat_pct_target": 23,
        "fat_pct_intermediate": 30
      },
      "treatment": {
        "label": "Medicação",
        "current": null,
        "application_day": null
      },
      "symptoms_schema": {
        "nausea": "Náusea",
        "reflux": "Refluxo",
        "constipation": "Constipação",
        "diarrhea": "Diarreia",
        "bloating": "Inchaço",
        "headache": "Dor de cabeça",
        "fatigue": "Cansaço",
        "low_energy": "Baixa energia",
        "anxiety_stress": "Ansiedade",
        "poor_sleep": "Sono ruim"
      },
      "history": [
        {
          "date": "2026-02-04",
          "weight_kg": 80.55,
          "fat_pct": 38.8,
          "subcutaneous_fat_pct": 33.7,
          "skeletal_muscle_pct": 35.7,
          "muscle_mass_kg": 46.3,
          "bone_mass_kg": 3,
          "protein_pct": 13.6,
          "visceral": 14,
          "bmi": 32.3,
          "water_pct": 42,
          "bmr_kcal": 1434,
          "body_age": 33
        },
        {
          "date": "2026-02-07",
          "weight_kg": 78.95,
          "fat_pct": 37.7,
          "subcutaneous_fat_pct": 32.9,
          "skeletal_muscle_pct": 36.3,
          "muscle_mass_kg": 46.2,
          "bone_mass_kg": 3,
          "protein_pct": 13.9,
          "visceral": 13,
          "bmi": 31.6,
          "water_pct": 42.7,
          "bmr_kcal": 1432,
          "body_age": 32
        },
        {
          "date": "2026-02-14",
          "weight_kg": 77.7,
          "fat_pct": 36.9,
          "subcutaneous_fat_pct": 32.3,
          "skeletal_muscle_pct": 36.8,
          "muscle_mass_kg": 46.1,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.2,
          "visceral": 13,
          "bmi": 31.1,
          "water_pct": 43.3,
          "bmr_kcal": 1428,
          "body_age": 32
        },
        {
          "date": "2026-02-21",
          "weight_kg": 77.4,
          "fat_pct": 36.8,
          "subcutaneous_fat_pct": 32.1,
          "skeletal_muscle_pct": 36.8,
          "muscle_mass_kg": 46,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.2,
          "visceral": 13,
          "bmi": 31,
          "water_pct": 43.4,
          "bmr_kcal": 1426,
          "body_age": 32
        },
        {
          "date": "2026-02-23",
          "weight_kg": 77,
          "fat_pct": 36.5,
          "subcutaneous_fat_pct": 31.9,
          "skeletal_muscle_pct": 37,
          "muscle_mass_kg": 46,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.3,
          "visceral": 13,
          "bmi": 30.8,
          "water_pct": 43.6,
          "bmr_kcal": 1426,
          "body_age": 32
        },
        {
          "date": "2026-02-26",
          "weight_kg": 77.35,
          "fat_pct": 36.8,
          "subcutaneous_fat_pct": 32.1,
          "skeletal_muscle_pct": 36.8,
          "muscle_mass_kg": 46,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.2,
          "visceral": 13,
          "bmi": 31,
          "water_pct": 43.4,
          "bmr_kcal": 1426,
          "body_age": 32
        },
        {
          "date": "2026-03-01",
          "weight_kg": 76.7,
          "fat_pct": 36.3,
          "subcutaneous_fat_pct": 31.8,
          "skeletal_muscle_pct": 37.1,
          "muscle_mass_kg": 45.9,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.3,
          "visceral": 13,
          "bmi": 30.7,
          "water_pct": 43.7,
          "bmr_kcal": 1425,
          "body_age": 32
        },
        {
          "date": "2026-03-04",
          "weight_kg": 77.25,
          "fat_pct": 36.6,
          "subcutaneous_fat_pct": 32,
          "skeletal_muscle_pct": 36.9,
          "muscle_mass_kg": 46,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.3,
          "visceral": 13,
          "bmi": 30.9,
          "water_pct": 43.5,
          "bmr_kcal": 1427,
          "body_age": 32
        },
        {
          "date": "2026-03-08",
          "weight_kg": 75.45,
          "fat_pct": 35.5,
          "subcutaneous_fat_pct": 31.1,
          "skeletal_muscle_pct": 37.6,
          "muscle_mass_kg": 45.7,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.6,
          "visceral": 12,
          "bmi": 30.2,
          "water_pct": 44.2,
          "bmr_kcal": 1420,
          "body_age": 32
        },
        {
          "date": "2026-03-11",
          "weight_kg": 75.5,
          "fat_pct": 35.6,
          "subcutaneous_fat_pct": 31.1,
          "skeletal_muscle_pct": 37.6,
          "muscle_mass_kg": 45.7,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.6,
          "visceral": 12,
          "bmi": 30.2,
          "water_pct": 44.2,
          "bmr_kcal": 1421,
          "body_age": 32
        },
        {
          "date": "2026-03-15",
          "weight_kg": 74.9,
          "fat_pct": 35.2,
          "subcutaneous_fat_pct": 30.9,
          "skeletal_muscle_pct": 37.7,
          "muscle_mass_kg": 45.6,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.7,
          "visceral": 12,
          "bmi": 30,
          "water_pct": 44.4,
          "bmr_kcal": 1417,
          "body_age": 32
        },
        {
          "date": "2026-03-18",
          "weight_kg": 74.9,
          "fat_pct": 35.2,
          "subcutaneous_fat_pct": 30.9,
          "skeletal_muscle_pct": 37.7,
          "muscle_mass_kg": 45.6,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.7,
          "visceral": 12,
          "bmi": 30,
          "water_pct": 44.4,
          "bmr_kcal": 1417,
          "body_age": 32
        },
        {
          "date": "2026-03-22",
          "weight_kg": 74.3,
          "fat_pct": 34.9,
          "subcutaneous_fat_pct": 30.6,
          "skeletal_muscle_pct": 37.9,
          "muscle_mass_kg": 45.4,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.8,
          "visceral": 12,
          "bmi": 29.8,
          "water_pct": 44.6,
          "bmr_kcal": 1414,
          "body_age": 31
        },
        {
          "date": "2026-03-23",
          "weight_kg": 73.55,
          "fat_pct": 34.5,
          "subcutaneous_fat_pct": 30.3,
          "skeletal_muscle_pct": 38.2,
          "muscle_mass_kg": 45.3,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.9,
          "visceral": 11,
          "bmi": 29.5,
          "water_pct": 45,
          "bmr_kcal": 1411,
          "body_age": 31
        },
        {
          "date": "2026-03-30",
          "weight_kg": 73.6,
          "fat_pct": 34.5,
          "subcutaneous_fat_pct": 30.3,
          "skeletal_muscle_pct": 38.2,
          "muscle_mass_kg": 45.3,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.9,
          "visceral": 11,
          "bmi": 29.5,
          "water_pct": 45,
          "bmr_kcal": 1411,
          "body_age": 31
        },
        {
          "date": "2026-04-01",
          "weight_kg": 74.2,
          "fat_pct": 34.8,
          "subcutaneous_fat_pct": 30.5,
          "skeletal_muscle_pct": 38,
          "muscle_mass_kg": 45.5,
          "bone_mass_kg": 2.9,
          "protein_pct": 14.8,
          "visceral": 12,
          "bmi": 29.7,
          "water_pct": 44.8,
          "bmr_kcal": 1415,
          "body_age": 31
        },
        {
          "date": "2026-04-05",
          "weight_kg": 73,
          "fat_pct": 34,
          "subcutaneous_fat_pct": 29.9,
          "skeletal_muscle_pct": 38.5,
          "muscle_mass_kg": 45.3,
          "bone_mass_kg": 2.9,
          "protein_pct": 15,
          "visceral": 11,
          "bmi": 29.2,
          "water_pct": 45.3,
          "bmr_kcal": 1410,
          "body_age": 31
        }
      ],
      "measurements": [
        {
          "date": "2026-02-04",
          "cintura": 87,
          "peito": 97,
          "bracos": 36,
          "ombros": 107,
          "quadril": 117,
          "coxas": 71,
          "panturrilhas": 41
        },
        {
          "date": "2026-03-14",
          "cintura": 85,
          "peito": 89,
          "bracos": 35,
          "ombros": null,
          "quadril": 112,
          "coxas": 70,
          "panturrilhas": 41
        },
        {
          "date": "2026-03-23",
          "cintura": 83,
          "peito": 93,
          "bracos": 35,
          "ombros": 104,
          "quadril": 114,
          "coxas": 69,
          "panturrilhas": 40
        },
        {
          "date": "2026-04-05",
          "cintura": 82,
          "peito": 89,
          "bracos": 34,
          "ombros": 104,
          "quadril": 113,
          "coxas": 65,
          "panturrilhas": 39
        }
      ]
    }
  },
  "exams": {
    "davidson": [
      {
        "date": "2026-01-23",
        "label": "Painel completo — Laboratório São Marcos",
        "results": [
          {
            "name": "Eritrócitos",
            "value": 5.31,
            "unit": "10^6/μL",
            "ref": "4.50–5.50",
            "status": "ok"
          },
          {
            "name": "Hemoglobina",
            "value": 15.2,
            "unit": "g/dL",
            "ref": "13.0–17.0",
            "status": "ok"
          },
          {
            "name": "Hematócrito",
            "value": 45.3,
            "unit": "%",
            "ref": "40.0–50.0",
            "status": "ok"
          },
          {
            "name": "VCM",
            "value": 85.3,
            "unit": "fL",
            "ref": "83.0–101.0",
            "status": "ok"
          },
          {
            "name": "HCM",
            "value": 28.7,
            "unit": "pg",
            "ref": "27.0–32.0",
            "status": "ok"
          },
          {
            "name": "CHCM",
            "value": 33.6,
            "unit": "g/dL",
            "ref": "31.0–35.0",
            "status": "ok"
          },
          {
            "name": "RDW",
            "value": 13.7,
            "unit": "%",
            "ref": "11.6–14.0",
            "status": "ok"
          },
          {
            "name": "Leucócitos",
            "value": 5720,
            "unit": "/μL",
            "ref": "4000–10000",
            "status": "ok"
          },
          {
            "name": "Plaquetas",
            "value": 280000,
            "unit": "/μL",
            "ref": "150000–450000",
            "status": "ok"
          },
          {
            "name": "Ferritina",
            "value": 100.8,
            "unit": "ng/mL",
            "ref": "22.0–322.0",
            "status": "ok"
          },
          {
            "name": "Ferro sérico",
            "value": 111,
            "unit": "μg/dL",
            "ref": "65–175",
            "status": "ok"
          },
          {
            "name": "Cap. fixação latente ferro",
            "value": 187,
            "unit": "μg/dL",
            "ref": "110.0–370.0",
            "status": "ok"
          },
          {
            "name": "Cap. total fixação ferro",
            "value": 298,
            "unit": "μg/dL",
            "ref": "250–425",
            "status": "ok"
          },
          {
            "name": "Índice sat. transferrina",
            "value": 37,
            "unit": "%",
            "ref": "20–50",
            "status": "ok"
          },
          {
            "name": "Vitamina B12",
            "value": 323,
            "unit": "pg/mL",
            "ref": "223.0–672.0",
            "status": "ok"
          },
          {
            "name": "Vitamina D (25-OH)",
            "value": 33,
            "unit": "ng/mL",
            "ref": ">20 (>30 grupo risco)",
            "status": "ok"
          },
          {
            "name": "Uréia",
            "value": 29,
            "unit": "mg/dL",
            "ref": "19–49",
            "status": "ok"
          },
          {
            "name": "Creatinina",
            "value": 1.35,
            "unit": "mg/dL",
            "ref": "0.70–1.30",
            "status": "warn"
          },
          {
            "name": "eGFR (CKD-EPI)",
            "value": 74,
            "unit": "mL/min/1.73m²",
            "ref": ">90",
            "status": "warn"
          },
          {
            "name": "Potássio",
            "value": 4.8,
            "unit": "mmol/L",
            "ref": "3.5–5.1",
            "status": "ok"
          },
          {
            "name": "Sódio",
            "value": 138,
            "unit": "mmol/L",
            "ref": "136–145",
            "status": "ok"
          },
          {
            "name": "Magnésio",
            "value": 2.2,
            "unit": "mg/dL",
            "ref": "1.3–2.7",
            "status": "ok"
          },
          {
            "name": "Homocisteína",
            "value": 14,
            "unit": "μmol/L",
            "ref": "≤15 normal",
            "status": "ok"
          },
          {
            "name": "HbA1c",
            "value": 5.8,
            "unit": "%",
            "ref": "<5.7 normal",
            "status": "warn"
          },
          {
            "name": "Glicose média estimada",
            "value": 120,
            "unit": "mg/dL",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "Glicose jejum",
            "value": 90,
            "unit": "mg/dL",
            "ref": "70–99",
            "status": "ok"
          },
          {
            "name": "Insulina",
            "value": 8.4,
            "unit": "μUI/mL",
            "ref": "2.5–13.1",
            "status": "ok"
          },
          {
            "name": "HOMA-IR",
            "value": 1.87,
            "unit": "",
            "ref": "<2.70",
            "status": "ok"
          },
          {
            "name": "Triglicérides",
            "value": 176,
            "unit": "mg/dL",
            "ref": "<150 jejum",
            "status": "warn"
          },
          {
            "name": "Colesterol total",
            "value": 227,
            "unit": "mg/dL",
            "ref": "<190 jejum",
            "status": "warn"
          },
          {
            "name": "HDL",
            "value": 46,
            "unit": "mg/dL",
            "ref": ">40 jejum",
            "status": "ok"
          },
          {
            "name": "Não-HDL",
            "value": 181,
            "unit": "mg/dL",
            "ref": "<130 intermed.",
            "status": "warn"
          },
          {
            "name": "LDL (calculado)",
            "value": 150,
            "unit": "mg/dL",
            "ref": "<130 intermed.",
            "status": "warn"
          },
          {
            "name": "VLDL",
            "value": 31,
            "unit": "mg/dL",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "Ácido úrico",
            "value": 6,
            "unit": "mg/dL",
            "ref": "3.8–8.6",
            "status": "ok"
          },
          {
            "name": "TGO (AST)",
            "value": 31,
            "unit": "U/L",
            "ref": "<34",
            "status": "ok"
          },
          {
            "name": "TGP (ALT)",
            "value": 36,
            "unit": "U/L",
            "ref": "10–49",
            "status": "ok"
          },
          {
            "name": "Gama-GT",
            "value": 21,
            "unit": "U/L",
            "ref": "<60",
            "status": "ok"
          },
          {
            "name": "TSH",
            "value": 1.69,
            "unit": "μUI/mL",
            "ref": "0.40–4.30",
            "status": "ok"
          },
          {
            "name": "T4 livre",
            "value": 1.17,
            "unit": "ng/dL",
            "ref": "0.89–1.76",
            "status": "ok"
          },
          {
            "name": "Estradiol",
            "value": 32.6,
            "unit": "pg/mL",
            "ref": "≤39.8 masc. >21a",
            "status": "ok"
          },
          {
            "name": "FSH",
            "value": 2.8,
            "unit": "mUI/mL",
            "ref": "1.4–18.1",
            "status": "ok"
          },
          {
            "name": "LH",
            "value": 3.4,
            "unit": "mUI/mL",
            "ref": "1.5–9.3",
            "status": "ok"
          },
          {
            "name": "Testosterona total",
            "value": 304.1,
            "unit": "ng/dL",
            "ref": "164.94–753.38 (22-49a)",
            "status": "ok"
          },
          {
            "name": "SHBG",
            "value": 12.1,
            "unit": "nmol/L",
            "ref": "10.0–57.0",
            "status": "ok"
          },
          {
            "name": "Testosterona livre calc.",
            "value": 9.34,
            "unit": "ng/dL",
            "ref": "3.40–24.60 (17-40a)",
            "status": "ok"
          },
          {
            "name": "Testosterona biodisponível",
            "value": 218.8,
            "unit": "ng/dL",
            "ref": "82–626 (17-40a)",
            "status": "ok"
          },
          {
            "name": "DHT",
            "value": 362.2,
            "unit": "pg/mL",
            "ref": "143–842 masc.",
            "status": "ok"
          }
        ],
        "notes": "Base laboratorial completa pré-tratamento. Creatinina/eGFR limítrofe — monitorar. HbA1c 5.8% (pré-diabetes). Colesterol total 227 e LDL 150 elevados. Triglicérides 176 acima do ideal. Testosterona total 304 ng/dL — baixa para 27 anos (motivou clomifeno)."
      },
      {
        "date": "2026-03-03",
        "label": "Painel hormonal (follow-up clomifeno) — São Marcos",
        "results": [
          {
            "name": "FSH",
            "value": 4.6,
            "unit": "mUI/mL",
            "ref": "1.4–18.1",
            "status": "ok"
          },
          {
            "name": "LH",
            "value": 4.4,
            "unit": "mUI/mL",
            "ref": "1.5–9.3",
            "status": "ok"
          },
          {
            "name": "Testosterona total",
            "value": 737.6,
            "unit": "ng/dL",
            "ref": "164.94–753.38 (22-49a)",
            "status": "ok"
          },
          {
            "name": "SHBG",
            "value": 15.1,
            "unit": "nmol/L",
            "ref": "10.0–57.0",
            "status": "ok"
          },
          {
            "name": "Testosterona livre calc.",
            "value": 23.19,
            "unit": "ng/dL",
            "ref": "3.40–24.60 (17-40a)",
            "status": "ok"
          },
          {
            "name": "Testosterona biodisponível",
            "value": 543.5,
            "unit": "ng/dL",
            "ref": "82–626 (17-40a)",
            "status": "ok"
          }
        ],
        "notes": "Excelente resposta ao clomifeno: testosterona total subiu de 304 → 737 ng/dL (+142%). FSH 2.8→4.6, LH 3.4→4.4 — eixo respondendo bem."
      }
    ],
    "isabella": [
      {
        "date": "2026-01-29",
        "label": "Painel completo — Laboratório São Marcos",
        "results": [
          {
            "name": "Eritrócitos",
            "value": 4.58,
            "unit": "10^6/μL",
            "ref": "3.80–4.80",
            "status": "ok"
          },
          {
            "name": "Hemoglobina",
            "value": 13.8,
            "unit": "g/dL",
            "ref": "12.0–15.0",
            "status": "ok"
          },
          {
            "name": "Hematócrito",
            "value": 39.1,
            "unit": "%",
            "ref": "36.0–46.0",
            "status": "ok"
          },
          {
            "name": "VCM",
            "value": 85.3,
            "unit": "fL",
            "ref": "83.0–101.0",
            "status": "ok"
          },
          {
            "name": "HCM",
            "value": 30.2,
            "unit": "pg",
            "ref": "27.0–32.0",
            "status": "ok"
          },
          {
            "name": "CHCM",
            "value": 35.3,
            "unit": "g/dL",
            "ref": "31.0–35.0",
            "status": "warn"
          },
          {
            "name": "RDW",
            "value": 13.6,
            "unit": "%",
            "ref": "11.6–14.0",
            "status": "ok"
          },
          {
            "name": "Leucócitos",
            "value": 8210,
            "unit": "/μL",
            "ref": "4000–10000",
            "status": "ok"
          },
          {
            "name": "Plaquetas",
            "value": 269000,
            "unit": "/μL",
            "ref": "150000–450000",
            "status": "ok"
          },
          {
            "name": "Ferritina",
            "value": 54.4,
            "unit": "ng/mL",
            "ref": "10.0–291.0",
            "status": "ok"
          },
          {
            "name": "Vitamina B12",
            "value": 244.0,
            "unit": "pg/mL",
            "ref": "223.0–672.0",
            "status": "ok"
          },
          {
            "name": "Vitamina D (25-OH)",
            "value": 42,
            "unit": "ng/mL",
            "ref": ">20 (>30 grupo risco)",
            "status": "ok"
          },
          {
            "name": "Creatinina",
            "value": 0.75,
            "unit": "mg/dL",
            "ref": "0.50–1.10",
            "status": "ok"
          },
          {
            "name": "eGFR (CKD-EPI)",
            "value": "Superior a 90",
            "unit": "mL/min/1.73m²",
            "ref": ">90",
            "status": "ok"
          },
          {
            "name": "Glicose jejum",
            "value": 79,
            "unit": "mg/dL",
            "ref": "70–99",
            "status": "ok"
          },
          {
            "name": "HbA1c",
            "value": 5.6,
            "unit": "%",
            "ref": "<5.7 normal",
            "status": "ok"
          },
          {
            "name": "Glicose média estimada",
            "value": 114,
            "unit": "mg/dL",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "LDL (calculado)",
            "value": 108,
            "unit": "mg/dL",
            "ref": "<130 intermed.",
            "status": "ok"
          },
          {
            "name": "HDL",
            "value": 81,
            "unit": "mg/dL",
            "ref": ">40",
            "status": "ok"
          },
          {
            "name": "VLDL",
            "value": 28,
            "unit": "mg/dL",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "Triglicérides",
            "value": 165,
            "unit": "mg/dL",
            "ref": "<150 jejum",
            "status": "warn"
          },
          {
            "name": "TGO (AST)",
            "value": 17,
            "unit": "U/L",
            "ref": "<34",
            "status": "ok"
          },
          {
            "name": "TGP (ALT)",
            "value": 11,
            "unit": "U/L",
            "ref": "10–49",
            "status": "ok"
          },
          {
            "name": "TSH",
            "value": 1.49,
            "unit": "μUI/mL",
            "ref": "0.40–4.30",
            "status": "ok"
          },
          {
            "name": "Grupo ABO / Rh",
            "value": "O Positivo",
            "unit": "",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "Anti HIV 1/2",
            "value": "Não Reagente",
            "unit": "",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "HBsAg (Hepatite B)",
            "value": "Não Reagente",
            "unit": "",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "Anti-HBs",
            "value": 40.5,
            "unit": "mUI/mL",
            "ref": "≥10 = protegida",
            "status": "ok"
          },
          {
            "name": "Anti-HCV (Hepatite C)",
            "value": "Não Reagente",
            "unit": "",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "Rubéola IgG",
            "value": 42.5,
            "unit": "UI/mL",
            "ref": "≥10 = Reagente",
            "status": "ok"
          },
          {
            "name": "Sífilis",
            "value": "Não Reagente",
            "unit": "",
            "ref": "",
            "status": "ok"
          },
          {
            "name": "Toxoplasmose IgG",
            "value": "<0.2",
            "unit": "UI/mL",
            "ref": "<1.6 = Não reagente",
            "status": "ok"
          }
        ],
        "notes": "Painel pré-nupcial/gestacional completo. CHCM 35.3 levemente acima (ref 35.0). Triglicérides 165 acima do ideal (<150). HDL excelente (81). Sorologias negativas. Imunidade Rubéola e Hepatite B confirmada. Tipo sanguíneo O+."
      }
    ]
  },
  "decision_rules": {
    "davidson": [
      {
        "trigger": "Peso estagnar por 2 semanas consecutivas",
        "action": "Revisar adesão/calorias/treino"
      },
      {
        "trigger": "Sintomas relevantes surgirem",
        "action": "Registrar no check-in + avaliar ajuste com médico"
      },
      {
        "trigger": "Piora de energia/sono por 2 semanas",
        "action": "Reduzir agressividade e ajustar rotina"
      }
    ],
    "isabella": []
  },
  "prescriptions": {
    "davidson": [
      {
        "name": "Citrato de clomifeno",
        "dose": "50 mg",
        "frequency": "conforme prescrição",
        "since": "2026-01"
      },
      {
        "name": "Mounjaro (tirzepatida)",
        "dose": "5 mg",
        "frequency": "semanal (quinta)",
        "since": "2026-02"
      }
    ],
    "isabella": []
  },
  "clinical_alerts": {
    "davidson": [
      {
        "type": "monitor",
        "text": "Creatinina 1.35 / eGFR 74 — monitorar função renal",
        "since": "2026-01"
      },
      {
        "type": "monitor",
        "text": "HbA1c 5.8% — faixa pré-diabetes, acompanhar com Mounjaro",
        "since": "2026-01"
      },
      {
        "type": "monitor",
        "text": "Colesterol total 227, LDL 150, Triglicérides 176 — perfil lipídico elevado",
        "since": "2026-01"
      },
      {
        "type": "ok",
        "text": "Testosterona respondeu ao clomifeno (304→737 ng/dL), manter acompanhamento",
        "since": "2026-03"
      },
      {
        "type": "action",
        "text": "Realizar exames em 20/04/2026 (pedido Dr. Ariel Dominianni)",
        "since": "2026-04"
      }
    ],
    "isabella": [
      {
        "type": "monitor",
        "text": "Triglicérides 165 — acima do ideal (<150), acompanhar dieta",
        "since": "2026-01"
      },
      {
        "type": "monitor",
        "text": "CHCM 35.3 — levemente acima do ref (31–35), sem ação imediata",
        "since": "2026-01"
      },
      {
        "type": "monitor",
        "text": "Vitamina B12 244 — na faixa baixa (ref 223–672), considerar suplementação",
        "since": "2026-01"
      },
      {
        "type": "ok",
        "text": "Toxoplasmose IgG não reagente — sem imunidade, evitar carne crua/gatos",
        "since": "2026-01"
      },
      {
        "type": "ok",
        "text": "Sorologias (HIV, Hepatite B/C, Sífilis) — todas negativas",
        "since": "2026-01"
      },
      {
        "type": "ok",
        "text": "Tipo sanguíneo: O Positivo · Imunidade Rubéola e Hepatite B confirmada",
        "since": "2026-01"
      }
    ]
  },
  "upcoming_exams": {
    "davidson": [
      {
        "exam": "Painel completo follow-up (pedido Dr. Ariel Dominianni)",
        "window": "2026-04-20",
        "status": "agendado",
        "notes": "16 exames: LH, FSH, Testosterona total, Estradiol, Hemograma, TGP (ALT), TGO (AST), Creatinina, HbA1c, Glicemia jejum, Insulina jejum, HOMA-IR, Perfil lipídico, Vitamina D, Vitamina B12, Ferritina, Testosterona livre calculada"
      }
    ],
    "isabella": []
  },
  "checkins": [
    {
      "date": "2026-03-13",
      "week_number": 11,
      "davidson": {
        "scale": {
          "weight_kg": 95.55,
          "fat_pct": 23.7,
          "skeletal_muscle_pct": 72.5,
          "visceral": 11.5,
          "bmi": 28.8,
          "water_pct": 55.1,
          "bmr_kcal": 1944
        },
        "trend": {
          "weight": "=",
          "fat": "=",
          "muscle": "=",
          "visceral": "="
        },
        "adherence": {
          "diet_score": 9,
          "workouts_count": 4,
          "notes": "Energia e força muito boas. Constipação controlada com PegLax 17g diário.",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 1,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "isabella": {
        "scale": {
          "weight_kg": 75.5,
          "fat_pct": 35.6,
          "skeletal_muscle_pct": 37.6,
          "visceral": 12,
          "bmi": 30.2,
          "water_pct": 44.2,
          "bmr_kcal": 1421
        },
        "trend": {
          "weight": "=",
          "fat": "=",
          "muscle": "=",
          "visceral": "="
        },
        "adherence": {
          "diet_score": 10,
          "workouts_count": 4,
          "notes": "tudo ok",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 0,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "summary": {
        "what_worked": "Davidson: dieta sem erros, 4 treinos, sem efeitos colaterais relevantes.",
        "what_hindered": "",
        "next_week_priority": "Davidson: possível subida para Mounjaro 5mg (~2 semanas)."
      }
    },
    {
      "date": "2026-03-23",
      "week_number": 12,
      "davidson": {
        "scale": {
          "weight_kg": 93.6,
          "fat_pct": 23,
          "skeletal_muscle_pct": 73.2,
          "visceral": 11,
          "bmi": 28.3,
          "water_pct": 55.6,
          "bmr_kcal": 1927
        },
        "trend": {
          "weight": "↓",
          "fat": "↓",
          "muscle": "↑",
          "visceral": "↓"
        },
        "adherence": {
          "diet_score": 10,
          "workouts_count": 4,
          "notes": "tudo ok",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 1,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "isabella": {
        "scale": {
          "weight_kg": 73.55,
          "fat_pct": 34.5,
          "skeletal_muscle_pct": 38.2,
          "visceral": 11,
          "bmi": 29.5,
          "water_pct": 45,
          "bmr_kcal": 1411
        },
        "trend": {
          "weight": "↓",
          "fat": "↓",
          "muscle": "↑",
          "visceral": "↓"
        },
        "adherence": {
          "diet_score": 10,
          "workouts_count": 4,
          "notes": "Medidas corporais coletadas.",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 0,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "summary": {
        "what_worked": "Davidson: −8.9 kg, gordura 23%. Isabella: −7.0 kg, gordura 34.5%.",
        "what_hindered": "",
        "next_week_priority": "Davidson: avaliar subida de dose Mounjaro."
      }
    },
    {
      "date": "2026-04-04",
      "week_number": 14,
      "davidson": {
        "scale": {
          "weight_kg": 93.45,
          "fat_pct": 22.8,
          "skeletal_muscle_pct": 73.3,
          "visceral": 10.9,
          "bmi": 28.2,
          "water_pct": 55.7,
          "bmr_kcal": 1927
        },
        "trend": {
          "weight": "↓",
          "fat": "↓",
          "muscle": "↑",
          "visceral": "↓"
        },
        "adherence": {
          "diet_score": 10,
          "workouts_count": 4,
          "notes": "Medidas corporais coletadas.",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 1,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "isabella": {
        "scale": {
          "weight_kg": 74.2,
          "fat_pct": 34.8,
          "skeletal_muscle_pct": 38,
          "visceral": 12,
          "bmi": 29.7,
          "water_pct": 44.8,
          "bmr_kcal": 1415
        },
        "trend": {
          "weight": "↑",
          "fat": "↑",
          "muscle": "↓",
          "visceral": "↑"
        },
        "adherence": {
          "diet_score": 10,
          "workouts_count": 4,
          "notes": "Medidas corporais coletadas.",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 0,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "summary": {
        "what_worked": "Davidson: estável, gordura continua caindo. Medidas corporais atualizadas.",
        "what_hindered": "",
        "next_week_priority": "Manter consistência. Davidson: exames agendados para 20/04."
      }
    },
    {
      "date": "2026-04-05",
      "week_number": 14,
      "davidson": {
        "scale": {
          "weight_kg": 92.75,
          "fat_pct": 22.5,
          "skeletal_muscle_pct": 73.6,
          "visceral": 10.7,
          "bmi": 28,
          "water_pct": 55.9,
          "bmr_kcal": 1922
        },
        "trend": {
          "weight": "↓",
          "fat": "↓",
          "muscle": "↑",
          "visceral": "↓"
        },
        "adherence": {
          "diet_score": 10,
          "workouts_count": 3,
          "notes": "tudo ok",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 1,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "isabella": {
        "scale": {
          "weight_kg": 73,
          "fat_pct": 34,
          "skeletal_muscle_pct": 38.5,
          "visceral": 11,
          "bmi": 29.2,
          "water_pct": 45.3,
          "bmr_kcal": 1410
        },
        "trend": {
          "weight": "↓",
          "fat": "↓",
          "muscle": "↑",
          "visceral": "↓"
        },
        "adherence": {
          "diet_score": 10,
          "workouts_count": 3,
          "notes": "tudo ok",
          "medication_on_time": true
        },
        "symptoms": {
          "nausea": 0,
          "reflux": 0,
          "constipation": 0,
          "diarrhea": 0,
          "bloating": 0,
          "headache": 0,
          "fatigue": 0,
          "low_energy": 0,
          "anxiety_stress": 0,
          "poor_sleep": 0,
          "other": ""
        }
      },
      "summary": {
        "what_worked": "Isabella: −7.55 kg desde baseline (38.8→34.0% gordura). Davidson: −9.75 kg, visceral 13.4→10.7.",
        "what_hindered": "",
        "next_week_priority": "Davidson: avaliar subida para Mounjaro 5mg."
      }
    }
  ]
};
