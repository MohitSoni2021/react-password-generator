import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowded, setNumbersAllowance] = useState(false);
  const [characterAllowded, setcharacterAllowance] = useState(false);
  const [password, setPassword] = useState("");

  const CopyBtnRef = useRef(null)
  const copyToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    
  })

  // The generator starts here 
  const passwordGenerator = useCallback(()=>{
    let passString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowded) passString += "0123456789"
    if(characterAllowded) passString += "!@#$%^&*()"
    let finalPass = ""

    for(let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * passString.length)
      console.log(randomIndex)
      finalPass += passString[randomIndex]
    }
    console.log(length)
    setPassword(finalPass)
    console.log("working...")

  }, [length, numbersAllowded, characterAllowded, setPassword])


  useEffect(()=> {
    passwordGenerator()
  }, [length, characterAllowded, numbersAllowded])


  return (
    <>
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="password-generator-card p-3 bg-slate-900 border-2 border-gray-500 container flex items-center justify-center flex-col w-fit rounded-lg gap-6 hover:shadow-xl shadow-white">
          <div className=''>
            <input type="text" className='py-1 rounded-l-md outline-none p-2 text-white bg-black' readOnly value={password}/>
            <button className='bg-blue-600 text-white px-3 rounded-r-md py-1 active:bg-gray-600 transition-all duration-150' ref={CopyBtnRef} onClick={copyToClipboard}>Copy</button>
          </div>

          <div className="other-customization-options text-white">

            <div className="flex items-center justify-center gap-2">
              <input type="range" name="" id="" min={6} max={50} value={length} onChange={(e)=>setLength(e.target.value)}/>
              <label htmlFor="input">Length ({length})</label>
            </div>

            <div className="flex items-center justify-center gap-6">


              <div className='flex items-center justify-center gap-2 flex-wrap'>
                <input type="checkbox" name="" id="" value={numbersAllowded} 
                  onChange={() => {
                    setNumbersAllowance((prev) => !prev)
                    console.log(numbersAllowded)
                  }}
                />
                <label htmlFor="input">Numbers</label>
              </div>
              
              <div className='flex items-center justify-center gap-2 flex-wrap'>
                <input type="checkbox" name="" id="" value={characterAllowded}
                onChange={() => {
                  setcharacterAllowance((prev) => !prev)
                }}
                />
                <label htmlFor="input">Characters</label>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
