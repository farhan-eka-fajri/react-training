
const TextHighlighter = () => {
  // Fungsi yang dipanggil saat onclick pada tombol warna
 const handleColorClick = (color) => {
  const selection = window.getSelection();
  
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

  // 1. Aktifkan designMode sementara agar seluruh dokumen bisa dimanipulasi 
  // layaknya Rich Text Editor (seperti MS Word/Google Docs)
  document.designMode = 'on';

  // 2. Eksekusi perintah pewarnaan background pada teks yang terblok.
  // Browser secara otomatis akan membuat, menimpa, atau memecah tag <span> 
  // menyesuaikan dengan batas kursor seleksi kamu saat ini.
  document.execCommand('backColor', false, color); 

  // 3. Matikan kembali designMode agar halaman kembali normal (read-only)
  document.designMode = 'off';

  // 4. Hilangkan blok kursor
  selection.removeAllRanges();
};

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Toolbar Palet Warna */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => handleColorClick('#a0c4ff')} // Warna biru "cool horizon"
          style={{ 
            width: '30px', height: '30px', borderRadius: '50%', 
            backgroundColor: '#a0c4ff', border: '1px solid #ccc', cursor: 'pointer' 
          }} 
          title="Cool Horizon"
        />
        <button 
          onClick={() => handleColorClick('#fdffb6')} // Warna kuning
          style={{ 
            width: '30px', height: '30px', borderRadius: '50%', 
            backgroundColor: '#fdffb6', border: '1px solid #ccc', cursor: 'pointer' 
          }} 
        />
      </div>

      {/* Area Teks */}
      <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
        <p>
          Coba blok (sorot) sebagian teks pada kalimat ini. Setelah teks terblok, 
          klik salah satu lingkaran warna di atas untuk menerapkan highlight 
          secara dinamis menggunakan DOM selection API.
        </p>
      </div>
    </div>
  );
};

export default TextHighlighter;