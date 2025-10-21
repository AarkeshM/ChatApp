


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    regionalLanguage: ''
  });

  const navigate = useNavigate();

 const languages = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "bg-BG": "Bulgarian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "zh-TW": "Chinese(Tiwan)",
    "zh-CN": "Chinese(PRC)",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English(UK)",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "ml-IN": "Malayalam",
    "mr-IN": "Marathi",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "pt-BR": "Portuguese(Brazil)",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "sa-IN": "Sanskrit",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "ur-IN": "urdu",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!user.gender) {
      toast.error('Please select a gender!', { position: 'top-right' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/register', user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Signup Successfully!', { position: 'top-center' });
        setUser({ fullName: '', username: '', password: '', confirmPassword: '', gender: '', regionalLanguage: '' });
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed!', { position: 'top-right' });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center px-4">
      <div className="backdrop-blur-md rounded-xl shadow-xl p-6 md:p-10 w-[450px] max-w-[310px] sm:max-w-[390px] md:max-w-[420px] lg:max-w-[480px]">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
          Signup
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-base font-semibold text-white mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              value={user.fullName}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-1">
              Username
            </label>
            <input
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-1">
              Password
            </label>
            <input
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="text-base font-semibold text-white">
              Gender:
            </label>
            <div className="flex gap-2">
              <label className="flex items-center text-stone-100 gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={user.gender === "Male"}
                  onChange={handleInputChange}
                  className="radio "
                />
                Male
              </label>
              <label className="flex items-center text-stone-100 gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={user.gender === "Female"}
                  onChange={handleInputChange}
                  className="radio"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-1">
              Regional Language
            </label>
            <select
              name="regionalLanguage"
              value={user.regionalLanguage}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Select your language</option>
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <p className="text-center font-medium text-lg text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-200 hover:underline">Login</Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

