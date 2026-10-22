
const TextHighlighter = () => {
  // Fungsi yang dipanggil saat onclick pada tombol warna
  const handleColorClick = (color) => {
    // 1. Ambil objek seleksi dari window
    const selection = window.getSelection();

    // 2. Validasi: Pastikan ada teks yang diblok dan seleksi tidak kosong
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return; 
    }

    // 3. Ambil range (rentang teks) dari seleksi pertama
    const range = selection.getRangeAt(0);

    // 4. Buat elemen pembungkus baru
    const highlightSpan = document.createElement('mark');
    highlightSpan.style.backgroundColor = color;
    highlightSpan.style.borderRadius = '4px'; // Opsional, agar sudutnya halus
    highlightSpan.style.color = 'inherit'; 

    try {
      // 5. Bungkus teks yang disorot ke dalam elemen baru tadi
      range.surroundContents(highlightSpan);
    } catch (error) {
      // Error biasanya terjadi jika blok teks melewati batas tag HTML lain (misal dari <p> ke <p> lain)
      console.warn("Seleksi melintasi batas elemen blok yang berbeda.");
    }

    // 6. Bersihkan seleksi kursor setelah warna diterapkan
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