import Navbar3 from './Navbar3'
import { AuthProvider } from '../../AuthContext'

const Navbar = () => {
  return (
    <AuthProvider>
      <div>
        {/* <Navbar2 /> */}
        <Navbar3 />
      </div>
    </AuthProvider>
  )
}

export default Navbar