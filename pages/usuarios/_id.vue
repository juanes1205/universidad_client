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
                    <div class="form-group col-6">
                      <label for="">Tipo Documento</label>
                      <select name="" id="" class="form-control" v-model="model.id_tipo_documento">
                        <option v-for="m in tipo_documentos" :value="m.id">
                          {{ m.tipo_documento }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group col-6">
                      <label for="">Documento</label>
                      <input type="text" name="" v-model="model.documento" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Nombre</label>
                      <input type="text" name="" v-model="model.nombre" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Teléfono</label>
                      <input type="text" name="" v-model="model.telefono" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Dirección</label>
                      <input type="text" name="" v-model="model.direccion" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Ciudad</label>
                      <input type="text" name="" v-model="model.ciudad" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Usuario</label>
                      <input type="text" name="" v-model="model.username" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Email</label>
                      <input type="text" name="" v-model="model.email" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Password</label>
                      <input type="text" name="" v-model="model.password" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Rol</label>
                      <input type="text" name="" v-model="model.rol" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
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
        nombre: "",
        username: '',
        email: '',
        password: '',
        estado: '',
        rol: '',
      },
      apiUrl: 'users',
      page: 'Usuario',
      modulo: 'Usuarios',
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
