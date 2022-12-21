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
                      <label for="">Materia</label>
                      <input type="text" name="" v-model="model.materia" class="form-control" id="" />
                    </div>
                    <div class="form-group col-6">
                      <label for="">Área Conocimiento</label>
                      <select name="" id="" class="form-control" v-model="model.id_area">
                        <option v-for="m in area_conocimientos" :value="m.id">
                          {{ m.area_conocimiento }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group col-6">
                      <label for="">Tipo Materia</label>
                      <select name="" id="" class="form-control" v-model="model.id_tipo_materia">
                        <option v-for="m in tipo_materias" :value="m.id">
                          {{ m.tipo_materia }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group col-6">
                      <label for="">Créditos</label>
                      <select name="" id="" class="form-control" v-model="model.id_credito">
                        <option v-for="m in creditos" :value="m.id">
                          {{ m.credito }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group col-6">
                      <label for="">Profesor</label>
                      <select name="" id="" class="form-control" v-model="model.id_user">
                        <option v-for="m in users" :value="m.id">
                          {{ m.nombre }}
                        </option>
                      </select>
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
      title: this.modulo,
    }
  },
  data() {
    return {
      load: true,

      model: {
        materia: '',
        id_credito: '',
        id_area: '',
        id_tipo_materia: '',
        id_user: '',
        estado: '',
      },
      apiUrl: 'materias',
      page: 'Usuario',
      modulo: 'Usuarios',
      users: [],
      area_conocimientos: [],
      tipo_materias: [],
      creditos: [],
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
          this.GET_DATA(this.apiUrl + "/" + this.$route.params.id), this.GET_DATA('users'), this.GET_DATA('area_conocimientos'), this.GET_DATA('tipo_materias'), this.GET_DATA('creditos')
        ]).then((v) => {
          this.model = v[0]
          this.users = v[1]
          this.area_conocimientos = v[2]
          this.tipo_materias = v[3]
          this.creditos = v[4]
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
