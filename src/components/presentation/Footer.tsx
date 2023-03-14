import { logo } from '../../assets/logo';

const Footer: React.FunctionComponent = () => {
  return (
    <footer aria-label='Site Footer' className='bg-white'>
      <div className='w-screen mx-auto px-4 pt-8  space-y-8 sm:px-6 lg:space-y-16 lg:px-8'>
        <div className='flex sm:flex-row flex-col items-center justify-between'>
          <div className='text-teal-600'>
            <img src={logo} className='w-36' />
          </div>

          <ul className='flex justify-center gap-6 mt-8 sm:mt-0 sm:justify-end md:mr-10'>
            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-gray-700 transition hover:opacity-75'
              >
                <span className='sr-only'>Facebook</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href='/'
                rel='noreferrer'
                target='_blank'
                className='text-gray-700 transition hover:opacity-75'
              >
                <span className='sr-only'>Instagram</span>

                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href='https://github.com/AironRuda/demo-day-bitalog'
                rel='noreferrer'
                target='_blank'
                className='text-gray-700 transition hover:opacity-75'
              >
                <span className='sr-only'>GitHub</span>

                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className='w-screen justify-evenly flex md:flex-row flex-col md:items-start items-center mt-4 gap-8 pt-4 border-t border-gray-100 lg:pt-8 text-start md:pr-96'>
          <div>
            <p className='font-medium text-gray-900'>Compañía</p>

            <nav aria-label='Footer Navigation - Company' className='mt-6'>
              <ul className='space-y-4 text-sm'>
                <li>
                  <a
                    href='#'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    Sobre Nosotros
                  </a>
                </li>

                <li>
                  <a
                    href='#'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    Conoce al equipo
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <p className='font-medium text-gray-900'>Cuéntanos</p>

            <nav aria-label='Footer Navigation - Company' className='mt-6'>
              <ul className='space-y-4 text-sm'>
                <li>
                  <a
                    href='#'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    Contacto
                  </a>
                </li>

                <li>
                  <a
                    href='#'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    FAQs
                  </a>
                </li>

                <li>
                  <a
                    href='#'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    Chat en vivo
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <p className='font-medium text-gray-900'>Legal</p>

            <nav aria-label='Footer Navigation - Legal' className='mt-6'>
              <ul className='space-y-4 text-sm'>
                <li>
                  <a
                    href='#'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    Accesibilidad
                  </a>
                </li>

                <li>
                  <a
                    href='#'
                    className='text-gray-700 transition hover:opacity-75'
                  >
                    Garantías
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <p className='text-xs text-gray-500 pb-5'>
          &copy; 2023. BitaLog. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;