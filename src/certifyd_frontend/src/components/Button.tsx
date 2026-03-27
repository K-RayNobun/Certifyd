

const Button = ( buttonText: string) => {
  return (
    <button className="mt-8 px-6 py-4 rounded-lg bg-gradient-to-r font-bold from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 transition duration-300">
        { buttonText }
    </button>
  )
}

export default Button