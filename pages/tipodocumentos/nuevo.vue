<template>
  <client-only>
    <div>
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-center">
            <div class="col-sm-8 col-12">
              <div class="card">
                <div class="card-header">
                  <h3>Agregar</h3>
                </div>
                <div class="card-body">
                  <CrudCreate :model="model" :apiUrl="apiUrl">
                    <div slot="body" class="row">
                      <div class="form-group col-12">
                        <label for="">Tipo Documento</label>
                        <input
                          type="text"
                          name=""
                          v-model="model.tipo_documento"
                          class="form-control"
                          id=""
                        />
                      </div>
                    </div>
                  </CrudCreate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminTemplate>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: this.modulo,
    }
  },
  data() {
    return {
      model: {
        tipo_documento: '',
        codigo: '',
      },
      apiUrl: 'tipo_documentos',
      page: 'Configuración',
      modulo: 'Tipo Documento',
    }
  },
  methods: {},
  mounted() {
    this.$nextTick(async () => {
      try {
      } catch (e) {
        console.log(e)
      } finally {
      }
    })
  },
}
</script>
