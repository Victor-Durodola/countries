import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
export default function Nav() {
    function lightMode() {
        document.querySelector("body").setAttribute("data-mode", "light")
      }
    
      function darkMode() {
        document.querySelector("body").setAttribute("data-mode", "dark")
      }

      function handleChange(e) {
        if (e.target.checked) darkMode();
        else lightMode();
      }
      
    return(
        <nav>
            <h1>Where in the world?</h1>
            <label className="mode-switch" htmlFor='mode-switch'>
                <input type="checkbox" id='mode-switch' name='mode-switch' onChange={handleChange}/>
                <FontAwesomeIcon icon={faMoon}/>
                {/* <p>Dark Mode</p> */}
            </label>
        </nav>
    )
}