import React, { useState, useEffect } from 'react';
import { Printer, User, FileText, Stethoscope, Activity, Settings } from 'lucide-react';

interface DoctorInfo {
  nameEn: string;
  nameBn: string;
  degreesEn: string[];
  degreesBn: string[];
  regNoEn: string[];
  regNoBn: string[];
  footerText: string;
  showSignature: boolean;
}

interface PatientInfo {
  name: string;
  sex: string;
  age: string;
  address: string;
  mobile: string;
  date: string;
}

interface MedicalInfo {
  dx: string;
  cc: string;
  oh: string;
  ix: string;
  drugHistory: string;
}

interface ExaminationInfo {
  bp: string;
  pulse: string;
  temp: string;
  spo2: string;
  heart: string;
  lungs: string;
  abd: string;
  anemia: string;
  jaundice: string;
  cyanosis: string;
  oedema: string;
  other: string;
}

const defaultDoctorInfo: DoctorInfo = {
  nameEn: 'Dr. Atikul Islam',
  nameBn: 'মোঃ আতিকুল ইসলাম',
  degreesEn: ['DMF, MCH, BSC'],
  degreesBn: ['ডিএমএফ, এমসিএইচ, বিএসসি'],
  regNoEn: ['BM&DC Reg No A-0000'],
  regNoBn: ['বিএম অ্যান্ড ডিসি রেজিঃ নংঃ A-0000'],
  footerText: 'চেম্বারঃ জিলসফট কনসালটেশন সেন্টার, ধানমন্ডি।\nচেম্বারে আসার পূর্বে সিরিয়ালঃ ০১৭২২-xx-xx-xx নম্বরে যোগাযোগ করে কম্পিউটারে ডেটা এন্ট্রি করাবেন।\nরোগী দেখার সময়ঃ বিকাল ৪ টা থেকে রাত ৮ টা (সপ্তাহে ৭ দিন)।',
  showSignature: true
};

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>(() => {
    const saved = localStorage.getItem('doctorInfo');
    return saved ? { ...defaultDoctorInfo, ...JSON.parse(saved) } : defaultDoctorInfo;
  });

  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    sex: '',
    age: '',
    address: '',
    mobile: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    dx: '',
    cc: '',
    oh: '',
    ix: '',
    drugHistory: '',
  });

  const [examinationInfo, setExaminationInfo] = useState<ExaminationInfo>({
    bp: '',
    pulse: '',
    temp: '',
    spo2: '',
    heart: '',
    lungs: '',
    abd: '',
    anemia: '',
    jaundice: '',
    cyanosis: '',
    oedema: '',
    other: '',
  });

  const [prescription, setPrescription] = useState('');

  useEffect(() => {
    localStorage.setItem('doctorInfo', JSON.stringify(doctorInfo));
  }, [doctorInfo]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Medical Prescription</title>
          <link href="https://fonts.googleapis.com/css2?family=Alkatra:wght@400;500;600;700&family=Great+Vibes&family=Tiro+Bangla:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Tiro Bangla', serif;
              margin: 0;
              color: #333;
              min-height: 100vh;
              position: relative;
              padding: 0 40px 120px;
            }
            .header {
              position: sticky;
              top: 0;
              background: white;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              padding: 20px 0;
              border-bottom: 2px solid #1a237e;
              margin: 0 -40px;
              padding: 20px 40px;
              z-index: 10;
            }
            .doctor-info-bn {
              text-align: left;
            }
            .doctor-info-en {
              text-align: right;
            }
            .doctor-name-bn {
              font-family: 'Alkatra', cursive;
              font-size: 28px;
              color: #1a237e;
              margin: 0;
            }
            .doctor-name-en {
              font-family: 'Alkatra', cursive;
              font-size: 24px;
              color: #1a237e;
              margin: 0;
            }
            .degrees {
              color: #455a64;
              margin: 5px 0;
              white-space: pre-line;
            }
            .reg-no {
              color: #455a64;
              margin: 5px 0;
              white-space: pre-line;
            }
            .patient-info {
              margin: 0;
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              position: relative;
              padding: 20px 0;
              border-bottom: 2px solid #1a237e;
            }
            .patient-info p {
              margin: 0;
              white-space: nowrap;
            }
            .date {
              position: absolute;
              right: 0;
              top: 20px;
            }
            .medical-info {
              display: flex;
              gap: 40px;
              position: relative;
              margin: 0 -40px;
              padding: 20px 40px;
              min-height: calc(100vh - 400px);
            }
            .left-section {
              flex: 1;
              padding-right: 40px;
            }
            .vertical-divider {
              position: absolute;
              left: calc(33.33% - 1px);
              top: 0;
              bottom: 0;
              width: 1px;
              background-color: #ccd7f5;
            }
            .right-section {
              flex: 2;
            }
            .section-title {
              font-family: 'Great Vibes', cursive;
              color: #1a237e;
              font-weight: bold;
              margin-bottom: 10px;
              font-size: 32px;
            }
            .examination-title {
              color: #1a237e;
              font-weight: bold;
              margin-bottom: 10px;
              font-size: 18px;
            }
            .examination-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              margin: 15px 0;
            }
            .examination-item {
              margin: 5px 0;
            }
            .info-label {
              font-weight: bold;
              margin-right: 5px;
            }
            .info-value {
              margin-left: 8px;
              white-space: pre-line;
            }
            .footer {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 20px 40px;
              text-align: center;
              border-top: 2px solid #1a237e;
              background: white;
            }
            .signature {
              position: fixed;
              bottom: 140px;
              right: 40px;
              text-align: center;
              display: ${doctorInfo.showSignature ? 'block' : 'none'};
            }
            .signature-line {
              width: 200px;
              border-top: 1px solid #1a237e;
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="doctor-info-bn">
              <h1 class="doctor-name-bn">${doctorInfo.nameBn}</h1>
              <p class="degrees">${(doctorInfo.degreesBn || []).join('\n')}</p>
              <p class="reg-no">${(doctorInfo.regNoBn || []).join('\n')}</p>
            </div>
            <div class="doctor-info-en">
              <h1 class="doctor-name-en">${doctorInfo.nameEn}</h1>
              <p class="degrees">${(doctorInfo.degreesEn || []).join('\n')}</p>
              <p class="reg-no">${(doctorInfo.regNoEn || []).join('\n')}</p>
            </div>
          </div>
          ${patientInfo.name && `
            <div class="patient-info">
              ${patientInfo.name && `<p><span class="info-label">Patient:</span>${patientInfo.name}</p>`}
              ${patientInfo.age && `<p><span class="info-label">Age:</span>${patientInfo.age}</p>`}
              ${patientInfo.sex && `<p><span class="info-label">Sex:</span>${patientInfo.sex}</p>`}
              ${patientInfo.address && `<p><span class="info-label">Address:</span>${patientInfo.address}</p>`}
              ${patientInfo.mobile && `<p><span class="info-label">Mobile:</span>${patientInfo.mobile}</p>`}
              <p class="date"><span class="info-label">Date:</span>${new Date(patientInfo.date).toLocaleDateString()}</p>
            </div>
          `}
          <div class="medical-info">
            <div class="left-section">
              ${medicalInfo.dx && `<p><span class="info-label">Dx:</span><span class="info-value">${medicalInfo.dx}</span></p>`}
              ${medicalInfo.cc && `<p><span class="info-label">C/C:</span><span class="info-value">${medicalInfo.cc}</span></p>`}
              ${medicalInfo.oh && `<p><span class="info-label">O/H:</span><span class="info-value">${medicalInfo.oh}</span></p>`}
              ${medicalInfo.ix && `<p><span class="info-label">Ix:</span><span class="info-value">${medicalInfo.ix}</span></p>`}
              ${medicalInfo.drugHistory && `<p><span class="info-label">Drug History:</span><span class="info-value">${medicalInfo.drugHistory}</span></p>`}
              
              ${Object.values(examinationInfo).some(value => value) && `
                <div style="margin-top: 20px;">
                  <p class="examination-title">On Examination:</p>
                  <div class="examination-grid">
                    ${examinationInfo.bp && `<p class="examination-item"><span class="info-label">BP:</span>${examinationInfo.bp} mmHg</p>`}
                    ${examinationInfo.pulse && `<p class="examination-item"><span class="info-label">Pulse:</span>${examinationInfo.pulse} b/min</p>`}
                    ${examinationInfo.temp && `<p class="examination-item"><span class="info-label">Temp:</span>${examinationInfo.temp} °F</p>`}
                    ${examinationInfo.spo2 && `<p class="examination-item"><span class="info-label">SpO2:</span>${examinationInfo.spo2}%</p>`}
                    ${examinationInfo.heart && `<p class="examination-item"><span class="info-label">Heart:</span>${examinationInfo.heart}</p>`}
                    ${examinationInfo.lungs && `<p class="examination-item"><span class="info-label">Lungs:</span>${examinationInfo.lungs}</p>`}
                    ${examinationInfo.abd && `<p class="examination-item"><span class="info-label">Abd:</span>${examinationInfo.abd}</p>`}
                    ${examinationInfo.anemia && `<p class="examination-item"><span class="info-label">Anemia:</span>${examinationInfo.anemia}</p>`}
                    ${examinationInfo.jaundice && `<p class="examination-item"><span class="info-label">Jaundice:</span>${examinationInfo.jaundice}</p>`}
                    ${examinationInfo.cyanosis && `<p class="examination-item"><span class="info-label">Cyanosis:</span>${examinationInfo.cyanosis}</p>`}
                    ${examinationInfo.oedema && `<p class="examination-item"><span class="info-label">Oedema:</span>${examinationInfo.oedema}</p>`}
                    ${examinationInfo.other && `<p class="examination-item"><span class="info-label">Other:</span>${examinationInfo.other}</p>`}
                  </div>
                </div>
              `}
            </div>
            <div class="vertical-divider"></div>
            <div class="right-section">
              <div class="section-title">Rx</div>
              <div style="white-space: pre-line">${prescription}</div>
            </div>
          </div>
          ${doctorInfo.showSignature ? `
            <div class="signature">
              <div class="signature-line"></div>
              Signature
            </div>
          ` : ''}
          <div class="footer">
            ${(doctorInfo.footerText || '').split('\n').join('<br>')}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Settings Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Doctor Information Settings</h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Bangla Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Bangla Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name (Bangla)</label>
                    <input
                      type="text"
                      value={doctorInfo.nameBn}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, nameBn: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degrees (Bangla)</label>
                    <textarea
                      value={(doctorInfo.degreesBn || []).join('\n')}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, degreesBn: e.target.value.split('\n') })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number (Bangla)</label>
                    <textarea
                      value={(doctorInfo.regNoBn || []).join('\n')}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, regNoBn: e.target.value.split('\n') })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                </div>

                {/* English Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">English Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
                    <input
                      type="text"
                      value={doctorInfo.nameEn}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, nameEn: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degrees (English)</label>
                    <textarea
                      value={(doctorInfo.degreesEn || []).join('\n')}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, degreesEn: e.target.value.split('\n') })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number (English)</label>
                    <textarea
                      value={(doctorInfo.regNoEn || []).join('\n')}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, regNoEn: e.target.value.split('\n') })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Text and Signature Toggle */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Additional Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
                  <textarea
                    value={doctorInfo.footerText}
                    onChange={(e) => setDoctorInfo({ ...doctorInfo, footerText: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Enter footer text..."
                  />
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={doctorInfo.showSignature}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, showSignature: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-700">Show signature field in prescription</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patient Information Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-900" />
            <h2 className="text-xl font-semibold text-blue-900">Patient Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Patient Name"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
            />
            <select
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={patientInfo.sex}
              onChange={(e) => setPatientInfo({ ...patientInfo, sex: e.target.value })}
            >
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Age"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={patientInfo.age}
              onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              value={patientInfo.address}
              onChange={(e) => setPatientInfo({ ...patientInfo, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={patientInfo.mobile}
              onChange={(e) => setPatientInfo({ ...patientInfo, mobile: e.target.value })}
            />
            <input
              type="date"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={patientInfo.date}
              onChange={(e) => setPatientInfo({ ...patientInfo, date: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Medical Information Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-blue-900" />
                <h2 className="text-xl font-semibold text-blue-900">Medical Information</h2>
              </div>
              <div className="space-y-4">
                <textarea
                  placeholder="Dx (Diagnosis)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  value={medicalInfo.dx}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, dx: e.target.value })}
                />
                <textarea
                  placeholder="C/C (Chief Complaints)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  value={medicalInfo.cc}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, cc: e.target.value })}
                />
                <textarea
                  placeholder="O/H (Disease History)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  value={medicalInfo.oh}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, oh: e.target.value })}
                />
                <textarea
                  placeholder="Ix (Investigation)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  value={medicalInfo.ix}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, ix: e.target.value })}
                />
                <textarea
                  placeholder="Drug History"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  value={medicalInfo.drugHistory}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, drugHistory: e.target.value })}
                />
              </div>
            </div>

            {/* On Examination Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-blue-900" />
                <h2 className="text-xl font-semibold text-blue-900">On Examination</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="BP"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={examinationInfo.bp}
                    onChange={(e) => setExaminationInfo({ ...examinationInfo, bp: e.target.value })}
                  />
                  <span className="absolute right-3 top-2 text-gray-500">mmHg</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pulse"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={examinationInfo.pulse}
                    onChange={(e) => setExaminationInfo({ ...examinationInfo, pulse: e.target.value })}
                  />
                  <span className="absolute right-3 top-2 text-gray-500">b/min</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Temp"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={examinationInfo.temp}
                    onChange={(e) => setExaminationInfo({ ...examinationInfo, temp: e.target.value })}
                  />
                  <span className="absolute right-3 top-2 text-gray-500">°F</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="SpO2"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={examinationInfo.spo2}
                    onChange={(e) => setExaminationInfo({ ...examinationInfo, spo2: e.target.value })}
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
                <input
                  type="text"
                  placeholder="Heart"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={examinationInfo.heart}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, heart: e.target.value })}
                />
                <input
                  type="text"
                 placeholder="Lungs"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={examinationInfo.lungs}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, lungs: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Abd"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={examinationInfo.abd}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, abd: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Anemia"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={examinationInfo.anemia}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, anemia: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Jaundice"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={examinationInfo.jaundice}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, jaundice: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Cyanosis"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={examinationInfo.cyanosis}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, cyanosis: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Oedema"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={examinationInfo.oedema}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, oedema: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Other findings"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
                  value={examinationInfo.other}
                  onChange={(e) => setExaminationInfo({ ...examinationInfo, other: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Prescription Area */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-900" />
              <h2 className="text-xl font-semibold text-blue-900">Prescription</h2>
            </div>
            <textarea
              className="w-full h-[600px] px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write prescription here..."
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />
          </div>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-5 h-5" />
          Print Prescription
        </button>
      </div>
    </div>
  );
}

export default App;