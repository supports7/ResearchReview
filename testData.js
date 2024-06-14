
const testClinicalAreas = [
    {
        "id": "4956793000006979226",
        "created_Time": "2022-11-09T11:20:00",
        "modified_Time": "2023-12-18T14:29:54",
        "isActive": true,
        "name": "Medical Specialty (AU)",
        "clinical_Area_Ref": "CA-204",
        "parent_Id": null,
        "country": "Australia"
    },
    {
        "id": "4956793000006979231",
        "created_Time": "2022-11-09T11:20:28",
        "modified_Time": "2023-12-18T14:29:54",
        "isActive": true,
        "name": "Surgical Specialty (AU)",
        "clinical_Area_Ref": "CA-205",
        "parent_Id": null,
        "country": "Australia"
    },
    {
        "id": "4956793000006979236",
        "created_Time": "2022-11-09T11:20:56",
        "modified_Time": "2023-12-18T14:29:54",
        "isActive": true,
        "name": "General Medicine (AU)",
        "clinical_Area_Ref": "CA-206",
        "parent_Id": null,
        "country": "Australia"
    },
    {
        "id": "4956793000006999048",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Allergy (AU)",
        "clinical_Area_Ref": "SG-1167",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999049",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Dermatology (AU)",
        "clinical_Area_Ref": "SG-1168",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999050",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Emergency Medicine (AU)",
        "clinical_Area_Ref": "SG-1169",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999051",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Fertility (AU)",
        "clinical_Area_Ref": "SG-1170",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999052",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Gene Therapy (AU)",
        "clinical_Area_Ref": "SG-1171",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999053",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Immunology (AU)",
        "clinical_Area_Ref": "SG-1172",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999054",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Internal Medicine (AU)",
        "clinical_Area_Ref": "SG-1173",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999055",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Neurology (AU)",
        "clinical_Area_Ref": "SG-1174",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999056",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Obstetrics (AU)",
        "clinical_Area_Ref": "SG-1175",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999057",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Ophthalmology (AU)",
        "clinical_Area_Ref": "SG-1176",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999058",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Paediatrics (AU)",
        "clinical_Area_Ref": "SG-1177",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999059",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Pain Management (AU)",
        "clinical_Area_Ref": "SG-1178",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999060",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Palliative Medicine (AU)",
        "clinical_Area_Ref": "SG-1179",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999061",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Psychiatry (AU)",
        "clinical_Area_Ref": "SG-1180",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999062",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Rehabilitation (AU)",
        "clinical_Area_Ref": "SG-1181",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999063",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Sexual Health (AU)",
        "clinical_Area_Ref": "SG-1182",
        "parent_Id": "4956793000006979226",
        "country": "Australia"
    },
    {
        "id": "4956793000006999064",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Anaesthesia (AU)",
        "clinical_Area_Ref": "SG-1183",
        "parent_Id": "4956793000006979231",
        "country": "Australia"
    },
    {
        "id": "4956793000006999065",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "General Surgery (AU)",
        "clinical_Area_Ref": "SG-1184",
        "parent_Id": "4956793000006979231",
        "country": "Australia"
    },
    {
        "id": "4956793000006999066",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Urology (AU)",
        "clinical_Area_Ref": "SG-1185",
        "parent_Id": "4956793000006979231",
        "country": "Australia"
    },
    {
        "id": "4956793000006999067",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Transplant (AU)",
        "clinical_Area_Ref": "SG-1186",
        "parent_Id": "4956793000006979231",
        "country": "Australia"
    },
    {
        "id": "4956793000006999068",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Orthopaedics (AU)",
        "clinical_Area_Ref": "SG-1187",
        "parent_Id": "4956793000006979231",
        "country": "Australia"
    },
    {
        "id": "4956793000006999069",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "ENT (AU)",
        "clinical_Area_Ref": "SG-1188",
        "parent_Id": "4956793000006979231",
        "country": "Australia"
    },
    {
        "id": "4956793000006999070",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Plastic Surgery (AU)",
        "clinical_Area_Ref": "SG-1189",
        "parent_Id": "4956793000006979231",
        "country": "Australia"
    },
    {
        "id": "4956793000006999071",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Clinical Life (AU)",
        "clinical_Area_Ref": "SG-1190",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999072",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Dentistry (AU)",
        "clinical_Area_Ref": "SG-1191",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999073",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "General Practice (AU)",
        "clinical_Area_Ref": "SG-1192",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999074",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Hearing (AU)",
        "clinical_Area_Ref": "SG-1193",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999075",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Indigenous Health (AU)",
        "clinical_Area_Ref": "SG-1194",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999076",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Integrative Medicine (AU)",
        "clinical_Area_Ref": "SG-1195",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999077",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Medico-legal (AU)",
        "clinical_Area_Ref": "SG-1196",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999078",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Midwifery (AU)",
        "clinical_Area_Ref": "SG-1197",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999079",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Natural Health (AU)",
        "clinical_Area_Ref": "SG-1198",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999080",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Hospital Pharmacy (AU)",
        "clinical_Area_Ref": "SG-1199",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999081",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Pharmacy (AU)",
        "clinical_Area_Ref": "SG-1200",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999082",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Podiatry (AU)",
        "clinical_Area_Ref": "SG-1201",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000006999083",
        "created_Time": "2022-11-09T11:24:06",
        "modified_Time": "2023-12-18T14:50:03",
        "isActive": true,
        "name": "Wound Care (AU)",
        "clinical_Area_Ref": "SG-1202",
        "parent_Id": "4956793000006979236",
        "country": "Australia"
    },
    {
        "id": "4956793000007000048",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Allergy (AU)",
        "clinical_Area_Ref": "CAT-1197",
        "parent_Id": "4956793000006999048",
        "country": "Australia"
    },
    {
        "id": "4956793000007000049",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Skin Allergy (AU)",
        "clinical_Area_Ref": "CAT-1198",
        "parent_Id": "4956793000006999048",
        "country": "Australia"
    },
    {
        "id": "4956793000007000050",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Dermatitis (AU)",
        "clinical_Area_Ref": "CAT-1199",
        "parent_Id": "4956793000006999049",
        "country": "Australia"
    },
    {
        "id": "4956793000007000051",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T11:50:09",
        "isActive": true,
        "name": "Dermatology (AU)",
        "clinical_Area_Ref": "CAT-1200",
        "parent_Id": "4956793000006999049",
        "country": "Australia"
    },
    {
        "id": "4956793000007000052",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Hidradenitis Suppurativa (AU)",
        "clinical_Area_Ref": "CAT-1201",
        "parent_Id": "4956793000006999049",
        "country": "Australia"
    },
    {
        "id": "4956793000007000053",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Psoriasis (AU)",
        "clinical_Area_Ref": "CAT-1202",
        "parent_Id": "4956793000006999049",
        "country": "Australia"
    },
    {
        "id": "4956793000007000054",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Emergency Medicine (AU)",
        "clinical_Area_Ref": "CAT-1203",
        "parent_Id": "4956793000006999050",
        "country": "Australia"
    },
    {
        "id": "4956793000007000055",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Fertility (AU)",
        "clinical_Area_Ref": "CAT-1204",
        "parent_Id": "4956793000006999051",
        "country": "Australia"
    },
    {
        "id": "4956793000007000056",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Gene Therapy (AU)",
        "clinical_Area_Ref": "CAT-1205",
        "parent_Id": "4956793000006999052",
        "country": "Australia"
    },
    {
        "id": "4956793000007000057",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Immunology (AU)",
        "clinical_Area_Ref": "CAT-1206",
        "parent_Id": "4956793000006999053",
        "country": "Australia"
    },
    {
        "id": "4956793000007000058",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Biologics (AU)",
        "clinical_Area_Ref": "CAT-1207",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000059",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Cardiology (AU)",
        "clinical_Area_Ref": "CAT-1208",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000060",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Endocrinology (AU)",
        "clinical_Area_Ref": "CAT-1209",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000061",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Gastroenterology (AU)",
        "clinical_Area_Ref": "CAT-1210",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000062",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Geriatrics (AU)",
        "clinical_Area_Ref": "CAT-1211",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000063",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Haematology (AU)",
        "clinical_Area_Ref": "CAT-1212",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000064",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Infectious Diseases (AU)",
        "clinical_Area_Ref": "CAT-1213",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000065",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Internal Medicine (AU)",
        "clinical_Area_Ref": "CAT-1214",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000066",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Medical Oncology (AU)",
        "clinical_Area_Ref": "CAT-1215",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000067",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Nephrology (AU)",
        "clinical_Area_Ref": "CAT-1216",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000068",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Obesity (AU)",
        "clinical_Area_Ref": "CAT-1217",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000069",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Respiratory (AU)",
        "clinical_Area_Ref": "CAT-1218",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000070",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Rheumatology (AU)",
        "clinical_Area_Ref": "CAT-1219",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000071",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Sleep (AU)",
        "clinical_Area_Ref": "CAT-1220",
        "parent_Id": "4956793000006999054",
        "country": "Australia"
    },
    {
        "id": "4956793000007000072",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Alzheimers Disease (AU)",
        "clinical_Area_Ref": "CAT-1221",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000073",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Dystonia - Movement Disorders (AU)",
        "clinical_Area_Ref": "CAT-1222",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000074",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Epilepsy (AU)",
        "clinical_Area_Ref": "CAT-1223",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000075",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Migraine (AU)",
        "clinical_Area_Ref": "CAT-1224",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000076",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Multiple Sclerosis (AU)",
        "clinical_Area_Ref": "CAT-1225",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000077",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Neurology (AU)",
        "clinical_Area_Ref": "CAT-1226",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000078",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Parkinson's Disease (AU)",
        "clinical_Area_Ref": "CAT-1227",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000079",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Spasticity Management (AU)",
        "clinical_Area_Ref": "CAT-1228",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000080",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Stroke (AU)",
        "clinical_Area_Ref": "CAT-1229",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000081",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Vertigo (AU)",
        "clinical_Area_Ref": "CAT-1230",
        "parent_Id": "4956793000006999055",
        "country": "Australia"
    },
    {
        "id": "4956793000007000082",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Obstetrics (AU)",
        "clinical_Area_Ref": "CAT-1231",
        "parent_Id": "4956793000006999056",
        "country": "Australia"
    },
    {
        "id": "4956793000007000083",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Eye Health (AU)",
        "clinical_Area_Ref": "CAT-1232",
        "parent_Id": "4956793000006999057",
        "country": "Australia"
    },
    {
        "id": "4956793000007000084",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Macular Disease (AU)",
        "clinical_Area_Ref": "CAT-1233",
        "parent_Id": "4956793000006999057",
        "country": "Australia"
    },
    {
        "id": "4956793000007000085",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Paediatrics (AU)",
        "clinical_Area_Ref": "CAT-1234",
        "parent_Id": "4956793000006999058",
        "country": "Australia"
    },
    {
        "id": "4956793000007000086",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Pain Management (AU)",
        "clinical_Area_Ref": "CAT-1235",
        "parent_Id": "4956793000006999059",
        "country": "Australia"
    },
    {
        "id": "4956793000007000087",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Palliative Medicine (AU)",
        "clinical_Area_Ref": "CAT-1236",
        "parent_Id": "4956793000006999060",
        "country": "Australia"
    },
    {
        "id": "4956793000007000088",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Addiction Medicine (AU)",
        "clinical_Area_Ref": "CAT-1237",
        "parent_Id": "4956793000006999061",
        "country": "Australia"
    },
    {
        "id": "4956793000007000089",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "ADHD (AU)",
        "clinical_Area_Ref": "CAT-1238",
        "parent_Id": "4956793000006999061",
        "country": "Australia"
    },
    {
        "id": "4956793000007000090",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Depression (AU)",
        "clinical_Area_Ref": "CAT-1239",
        "parent_Id": "4956793000006999061",
        "country": "Australia"
    },
    {
        "id": "4956793000007000091",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Psychiatry (AU)",
        "clinical_Area_Ref": "CAT-1240",
        "parent_Id": "4956793000006999061",
        "country": "Australia"
    },
    {
        "id": "4956793000007000092",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Schizophrenia (AU)",
        "clinical_Area_Ref": "CAT-1241",
        "parent_Id": "4956793000006999061",
        "country": "Australia"
    },
    {
        "id": "4956793000007000093",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Rehabilitation (AU)",
        "clinical_Area_Ref": "CAT-1242",
        "parent_Id": "4956793000006999062",
        "country": "Australia"
    },
    {
        "id": "4956793000007000094",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Men's Sexual Health (AU)",
        "clinical_Area_Ref": "CAT-1243",
        "parent_Id": "4956793000006999063",
        "country": "Australia"
    },
    {
        "id": "4956793000007000095",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Women's Sexual Health (AU)",
        "clinical_Area_Ref": "CAT-1244",
        "parent_Id": "4956793000006999063",
        "country": "Australia"
    },
    {
        "id": "4956793000007000096",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Anaesthesia (AU)",
        "clinical_Area_Ref": "CAT-1245",
        "parent_Id": "4956793000006999064",
        "country": "Australia"
    },
    {
        "id": "4956793000007000097",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "General Surgery (AU)",
        "clinical_Area_Ref": "CAT-1246",
        "parent_Id": "4956793000006999065",
        "country": "Australia"
    },
    {
        "id": "4956793000007000098",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Urology (AU)",
        "clinical_Area_Ref": "CAT-1247",
        "parent_Id": "4956793000006999066",
        "country": "Australia"
    },
    {
        "id": "4956793000007000099",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Transplant (AU)",
        "clinical_Area_Ref": "CAT-1248",
        "parent_Id": "4956793000006999067",
        "country": "Australia"
    },
    {
        "id": "4956793000007000100",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Orthopaedics (AU)",
        "clinical_Area_Ref": "CAT-1249",
        "parent_Id": "4956793000006999068",
        "country": "Australia"
    },
    {
        "id": "4956793000007000101",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "ENT (AU)",
        "clinical_Area_Ref": "CAT-1250",
        "parent_Id": "4956793000006999069",
        "country": "Australia"
    },
    {
        "id": "4956793000007000102",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Plastic Surgery (AU)",
        "clinical_Area_Ref": "CAT-1251",
        "parent_Id": "4956793000006999070",
        "country": "Australia"
    },
    {
        "id": "4956793000007000103",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Clinical Life (AU)",
        "clinical_Area_Ref": "CAT-1252",
        "parent_Id": "4956793000006999071",
        "country": "Australia"
    },
    {
        "id": "4956793000007000104",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Dentistry (AU)",
        "clinical_Area_Ref": "CAT-1253",
        "parent_Id": "4956793000006999072",
        "country": "Australia"
    },
    {
        "id": "4956793000007000105",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Dental (AU)",
        "clinical_Area_Ref": "CAT-1254",
        "parent_Id": "4956793000006999072",
        "country": "Australia"
    },
    {
        "id": "4956793000007000106",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Dental and Oral Health (AU)",
        "clinical_Area_Ref": "CAT-1255",
        "parent_Id": "4956793000006999072",
        "country": "Australia"
    },
    {
        "id": "4956793000007000107",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Oral Health (AU)",
        "clinical_Area_Ref": "CAT-1256",
        "parent_Id": "4956793000006999072",
        "country": "Australia"
    },
    {
        "id": "4956793000007000108",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "General Practice (AU)",
        "clinical_Area_Ref": "CAT-1257",
        "parent_Id": "4956793000006999073",
        "country": "Australia"
    },
    {
        "id": "4956793000007000109",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Hearing (AU)",
        "clinical_Area_Ref": "CAT-1258",
        "parent_Id": "4956793000006999074",
        "country": "Australia"
    },
    {
        "id": "4956793000007000110",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Indigenous Health (AU)",
        "clinical_Area_Ref": "CAT-1259",
        "parent_Id": "4956793000006999075",
        "country": "Australia"
    },
    {
        "id": "4956793000007000111",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Integrative Medicine (AU)",
        "clinical_Area_Ref": "CAT-1260",
        "parent_Id": "4956793000006999076",
        "country": "Australia"
    },
    {
        "id": "4956793000007000112",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Medico-legal (AU)",
        "clinical_Area_Ref": "CAT-1261",
        "parent_Id": "4956793000006999077",
        "country": "Australia"
    },
    {
        "id": "4956793000007000113",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Midwifery (AU)",
        "clinical_Area_Ref": "CAT-1262",
        "parent_Id": "4956793000006999078",
        "country": "Australia"
    },
    {
        "id": "4956793000007000114",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Natural Health (AU)",
        "clinical_Area_Ref": "CAT-1263",
        "parent_Id": "4956793000006999079",
        "country": "Australia"
    },
    {
        "id": "4956793000007000115",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Hospital Pharmacy (AU)",
        "clinical_Area_Ref": "CAT-1264",
        "parent_Id": "4956793000006999080",
        "country": "Australia"
    },
    {
        "id": "4956793000007000116",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Pharmacy (AU)",
        "clinical_Area_Ref": "CAT-1265",
        "parent_Id": "4956793000006999081",
        "country": "Australia"
    },
    {
        "id": "4956793000007000117",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Podiatry (AU)",
        "clinical_Area_Ref": "CAT-1266",
        "parent_Id": "4956793000006999082",
        "country": "Australia"
    },
    {
        "id": "4956793000007000118",
        "created_Time": "2022-11-09T11:27:06",
        "modified_Time": "2023-12-19T09:42:25",
        "isActive": true,
        "name": "Wound Care (AU)",
        "clinical_Area_Ref": "CAT-1267",
        "parent_Id": "4956793000006999083",
        "country": "Australia"
    }
]

module.exports = testClinicalAreas;