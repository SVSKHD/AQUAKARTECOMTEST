const AquaPlainCardWithImage = ({data}) =>{
    const {photos , title} = data
return(
    <>
    <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="Aquakart Category"/>
  <div class="card-body">
    <h4>{title}</h4>
  </div>
</div>
    </>
)
}
export default AquaPlainCardWithImage