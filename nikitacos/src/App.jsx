import { useEffect, useState } from 'react';

export default function NikiTacosPortfolioIntro() {
  const [screen, setScreen] = useState('loading');
  const [showDialogue, setShowDialogue] = useState(false);
  const [typedText, setTypedText] = useState('');

  const dialogue = [
    "Hey, I'm Nikita 🌸",
    'The kettle is warm, and lamp is on.',
    'Feel free to look around ✦',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('intro');
      setShowDialogue(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showDialogue) return;

    let currentLine = 0;
    let currentChar = 0;
    let finalText = '';

    const typing = setInterval(() => {
      if (currentLine < dialogue.length) {
        const line = dialogue[currentLine];

        finalText += line[currentChar];
        setTypedText(finalText);

        currentChar++;

        if (currentChar >= line.length) {
          finalText += '\n';
          currentLine++;
          currentChar = 0;
        }
      } else {
        clearInterval(typing);
      }
    }, 40);

    return () => clearInterval(typing);
  }, [showDialogue]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-black relative font-sans">
  
      {screen === 'loading' && (
        <section className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#241B35] via-[#544273] to-[#D8B9A5] transition-opacity duration-1000">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')]" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="bg-[#F8F4EE]/90 border-[6px] border-[#241B35] rounded-[2rem] p-10 md:p-14 shadow-[10px_10px_0px_#241B35] max-w-2xl w-full">
              <p className="font-mono uppercase tracking-[0.4em] text-[#6E5D73] text-sm mb-5">
                initializing portfolio...
              </p>

              <h1 className="text-5xl md:text-7xl text-[#241B35] font-serif leading-tight mb-6">
                NikiTacos.exe
              </h1>

              <p className="text-[#5E5367] text-lg leading-relaxed mb-10">
                Tiny details loading in...
              </p>

              <div className="w-full h-6 bg-[#D8CFC4] border-[4px] border-[#241B35] rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#A58AA3] via-[#D6B8FF] to-[#FFD7B8] animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      )}

      
      {screen === 'intro' && (
        <section className="absolute inset-0 bg-gradient-to-b from-[#2D2145] via-[#56477B] to-[#D7B7A6] flex items-center justify-center px-6 transition-all duration-1000">
          
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#D9B8FF] opacity-20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#FFD7B8] opacity-20 blur-3xl rounded-full animate-pulse" />

          <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
            
            <div className="flex justify-center">
              <div className="relative bg-[#8D68D1]/70 border-[6px] border-[#F6EFFF] rounded-[2rem] overflow-hidden shadow-[10px_10px_0px_#241B35]">
                <img
                  src="/avatar.png"
                  alt="Nikita Pixel Avatar"
                  className="w-[380px] md:w-[450px] object-cover"
                />
              </div>
            </div>

           
            <div className="bg-[#F8F4EE]/95 border-[6px] border-[#241B35] rounded-[2rem] p-8 md:p-10 shadow-[10px_10px_0px_#241B35] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-10 bg-[#241B35] flex items-center px-4 gap-2 border-b-[4px] border-[#181221]">
                <div className="w-3 h-3 rounded-full bg-[#FF8A8A]" />
                <div className="w-3 h-3 rounded-full bg-[#FFD37A]" />
                <div className="w-3 h-3 rounded-full bg-[#98D89E]" />
              </div>

              <div className="mt-8">
                <p className="font-mono uppercase tracking-[0.3em] text-xs text-[#7C6A7A] mb-5">
                  dialogue.log
                </p>

                <pre className="whitespace-pre-wrap text-[#3A2C43] text-lg md:text-2xl leading-relaxed font-medium min-h-[180px] font-sans">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </pre>

                <button
                  onClick={() => setScreen('room')}
                  className="mt-10 px-7 py-4 bg-[#8FA36B] text-[#F8F4EE] border-[4px] border-[#241B35] rounded-2xl shadow-[6px_6px_0px_#241B35] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-mono uppercase tracking-[0.2em]"
                >
                  Enter World
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      
      {screen === 'room' && (
        <section className="absolute inset-0 transition-all duration-1000 overflow-hidden">
        
          <img
            src="/room-bg.png"
            alt="Cozy Room"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

          
          <div>
            
            <button className="absolute left-[49%] top-[47%] group">
              <div className="w-5 h-5 rounded-full bg-[#FFD7F3] border-2 border-white animate-pulse shadow-[0_0_20px_#FFD7F3]" />

              <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all bg-[#241B35]/90 text-white px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap">
                Open PC
              </span>
            </button>

            
            <button className="absolute right-[28%] bottom-[28%] group">
              <div className="w-5 h-5 rounded-full bg-[#FFD7F3] border-2 border-white animate-pulse shadow-[0_0_20px_#FFD7F3]" />

              <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all bg-[#241B35]/90 text-white px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap">
                Open Journal
              </span>
            </button>

            
            <button className="absolute right-[36%] top-[42%] group">
              <div className="w-5 h-5 rounded-full bg-[#FFD7F3] border-2 border-white animate-pulse shadow-[0_0_20px_#FFD7F3]" />

              <span className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-all bg-[#241B35]/90 text-white px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap">
                Sticky Notes
              </span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

