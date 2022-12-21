<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Actualizar</h3>
              </div>
              <div class="card-body">
                <CrudUpdate :model="model" :apiUrl="apiUrl">
                  <div slot="body" class="row">
                    <div class="form-group col-12">
                      <label for="">Área Conocimiento</label>
                      <input type="text" name="" v-model="model.area_conocimiento" class="form-control" id="" />
                    </div>
                    <div class="form-group col-12">
                      <label for="">Estado</label>
                      <select class="form-select" aria-label="Default select example" v-model="model.estado">
                        <option selected>Seleccione un Estado</option>
                        <option value="1">Activar</option>
                        <option value="0">Desactivar</option>
                      </select>
                    </div>
                  </div>
                </CrudUpdate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Demo',
    }
  },
  data() {
    return {
      load: true,

      model: {
        area_conocimiento: '',
        estado: '',
      },
      apiUrl: 'area_conocimientos',
      page: 'Configuración',
      modulo: 'Área Conocimiento',
    }
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path)
      return res
    },
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await Promise.all([
          this.GET_DATA(this.apiUrl + '/' + this.$route.params.id),
        ]).then((v) => {
          this.model = v[0]
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      }
    })
  },
}
</script>
