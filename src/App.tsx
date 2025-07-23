import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div data-theme={theme} className="min-h-screen">
      {/* Navigation */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Home</a></li>
              <li><a>About</a></li>
              <li><a>Services</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">DaisyUI App</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><a>About</a></li>
            <li><a>Services</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-96 bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello DaisyUI!</h1>
            <p className="py-6">
              Beautiful, semantic component classes built on Tailwind CSS. 
              This is your starter template with modern UI components.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Counter Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Interactive Counter</h2>
              <p>Click the button to increment the counter!</p>
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-primary" 
                  onClick={() => setCount(count + 1)}
                >
                  Count: {count}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Statistics</h2>
              <div className="stats stats-vertical">
                <div className="stat">
                  <div className="stat-title">Total Users</div>
                  <div className="stat-value">31K</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Page Views</div>
                  <div className="stat-value">2.6M</div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Project Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">HTML</span>
                    <span className="text-sm">90%</span>
                  </div>
                  <progress className="progress progress-success w-full" value="90" max="100"></progress>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">React</span>
                    <span className="text-sm">75%</span>
                  </div>
                  <progress className="progress progress-primary w-full" value="75" max="100"></progress>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">DaisyUI</span>
                    <span className="text-sm">60%</span>
                  </div>
                  <progress className="progress progress-warning w-full" value="60" max="100"></progress>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Section */}
        <div className="mt-8 space-y-4">
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Welcome to your new DaisyUI application! Everything is working perfectly.</span>
          </div>
          
          <div className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Your setup is complete! You can now start building amazing UI components.</span>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Contact Information</h2>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="Your name" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="your@email.com" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Your message"></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by DaisyUI App</p>
        </aside>
      </footer>
    </div>
  )
}

export default App