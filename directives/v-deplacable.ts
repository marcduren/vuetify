export default {
  mounted(el: HTMLElement) {
    let xdown = 0
    let ydown = 0
    let element: HTMLElement = el

    function cliqueSouris(e: MouseEvent) {
      // To prevent selection while moving cursor
      e.preventDefault()

      xdown = e.screenX
      ydown = e.screenY
      element!.addEventListener('mousemove', deplacementSouris, false)
      element!.addEventListener('mouseup', relachementSouris, false)
    }
    function relachementSouris() {
      element!.removeEventListener('mousemove', deplacementSouris, false)
      element!.removeEventListener('mouseup', relachementSouris, false)
    }
    function deplacementSouris(e: MouseEvent) {
      const tableContainer = document.querySelector('.table-container')
      if (tableContainer) {
        tableContainer.scrollLeft += xdown - e.screenX
        tableContainer.scrollTop += ydown - e.screenY
        xdown = e.screenX
        ydown = e.screenY
      }
    }

    el.addEventListener('mousedown', cliqueSouris)
    el.addEventListener('mouseleave', relachementSouris)
    },
  beforeUnmount(el: any) {
    el.removeEventListener('mousedown',()=>{})
    el.removeEventListener('mouseleave',()=>{})
  },
}