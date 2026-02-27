// Small client-side behavior for /computer prototype
(() => {
  console.log('computer.js loaded')
  const termOutput = document.getElementById('termOutput')
  const termInput = document.getElementById('termInput')
  const inputBox = document.getElementById('cmd')

  function print(line) {
    const el = document.createElement('div')
    el.textContent = line
    termOutput.appendChild(el)
    termOutput.scrollTop = termOutput.scrollHeight
  }

  function runCommand(cmd) {
    const parts = cmd.trim().split(/\s+/)
    const name = parts[0] ? parts[0].toLowerCase() : ''
    const args = parts.slice(1)
    if(!name) return
    switch(name) {
      case 'help':
        print('Available commands: help, echo, whoami, clear, reset, demo')
        break
      case 'echo':
        print(args.join(' '))
        break
      case 'whoami':
        print('guest')
        break
      case 'clear':
        termOutput.innerHTML = ''
        break
      case 'reset':
        termOutput.innerHTML = ''
        print('Session reset')
        break
      case 'demo':
        print('Opening demo... (this is a placeholder)')
        break
      default:
        print(name + ': command not found')
    }
  }

  termInput.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const v = inputBox.value
    if(!v) return
    print('$ ' + v)
    runCommand(v)
    inputBox.value = ''
  })

  // wire the cards
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.action
      if(act === 'open-demo') {
        print('Demo link clicked — open in new tab')
        window.open('/', '_blank')
      } else if(act === 'info') {
        // navigate to the Info page instead of showing a popup
        window.location.href = 'info.html';
      } else if(act === 'reset') {
        termOutput.innerHTML = ''
        print('Interface reset')
      }
    })
  })
})();