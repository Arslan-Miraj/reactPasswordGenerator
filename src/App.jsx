import { useState, useCallback, useEffect, useRef, use } from 'react'
import './App.css'

function App() {
  
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(6)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)

  const passwordGenerator = useCallback(() => {
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""

    if (numAllowed) string += "0123456789"
    if (symbolAllowed) string += "{}()[]`~!@#$%^&*/-+_="

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, numAllowed, symbolAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, symbolAllowed, passwordGenerator])

  const passwordRef = useRef(null)
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-2xl py-8 px-6 my-12 bg-gray-900 text-white space-y-6">
  
  {/* Password Display */}
  <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden shadow-inner">
    <input
      type="text"
      value={password}
      readOnly
      placeholder="Your password will appear here"
      ref={passwordRef}
      className="flex-1 bg-gray-800 text-white px-4 py-3 outline-none placeholder-gray-500"
    />
    <button 
    onClick={copyToClipboard}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 transition-all duration-200">
      Copy
    </button>
  </div>

  {/* Generate Button */}
  {/* <div className="mt-4">
    <button
      onClick={passwordGenerator}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200"
    >
      Generate Password
    </button>
  </div> */}
  {/* Password Length */}
  <div>
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm font-medium text-gray-300">Password Length</label>
      <span className="text-sm font-semibold text-orange-400">{ length } </span>
    </div>
    <input
      type="range"
      min={6}
      max={100}
      value={length}
      onChange={(e) => { setLength(e.target.value)}}
      className="w-full h-2 appearance-none bg-gray-700 rounded-lg cursor-pointer accent-orange-500"
    />
  </div>

  {/* Options */}
  <div className="grid grid-cols-2 gap-4">
    <label className="flex items-center gap-2">
      <input 
      type="checkbox"
      id='numInput'
      checked={symbolAllowed}
      onChange={() => { setSymbolAllowed(!symbolAllowed) }}
      className="accent-orange-500 w-5 h-5" />
      <span className="text-sm">Include Symbols</span>
    </label>
    <label className="flex items-center gap-2">
      <input 
      type="checkbox"
      checked={numAllowed}
      onChange={() => { setNumAllowed(!numAllowed) }}
      className="accent-orange-500 w-5 h-5"
      id='charInput'
       />
      <span className="text-sm">Include Numbers</span>
    </label>
  </div>
</div>


      

    </>
  )
}

export default App
