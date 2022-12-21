<template>
  <client-only>
    <div>
      <JcLoader :load="load"></JcLoader>
      <AdminTemplate :page="page" :modulo="modulo">
        <div slot="body">
          <div class="row justify-content-end">
            <div class="col-2">
              <nuxtLink :to="url_nuevo" class="btn btn-dark btn-sm w-100">
                <i class="fas fa-plus"></i> Agregar
              </nuxtLink>
            </div>
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <th class="py-0 px-1">ID</th>
                      <th class="py-0 px-1">TIPO MATERIA</th>
                      <th class="py-0 px-1">ACCIONES</th>
                      <th class="py-0 px-1">ESTADO</th>
                    </thead>
                    <tbody>
                      <tr v-for="(m, i) in list">
                        <td class="py-0 px-1">{{ m.id }}</td>
                        <td class="py-0 px-1">{{ m.tipo_materia }}</td>
                        <td class="py-0 px-1">
                          <div class="btn-group">
                            <nuxtLink :to="url_editar + m.id" class="btn btn-flat btn-secondary btn-sm">Editar
                              <i class="fas fa-pen"></i>
                            </nuxtLink>
                            <template v-if="m.estado == '1'">
                              <button type="button" @click="Desactivar(m.id)" class="btn btn-flat btn-danger btn-sm">
                                <i class="fas fa-trash"></i> Desactivar
                              </button>
                            </template>
                          </div>
                        </td>
                        <td>
                          <template v-if="m.estado == '1'">
                            <span class="badge bg-success">Activo</span>
                          </template>
                          <template v-else>
                            <span class="badge bg-danger">Desactivado</span>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
      load: true,
      list: [],
      apiUrl: 'tipo_materias',
      page: 'Configuración',
      modulo: 'Tipo Materias',
      url_nuevo: '/tipomaterias/nuevo',
      url_editar: '/tipomaterias/',
    }
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path)
      return res
    },
    async DesactivarItem(id) {
      this.load = true
      try {
        const res = await this.$api.$delete(this.apiUrl + '/' + id)
        console.log(res)
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0]
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      }
    },

    Desactivar(id) {
      let self = this
      this.$swal
        .fire({
          title: 'Deseas Desactivar?',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Desactivar',
          cancelarButtonText: `Cancelar`,
        })
        .then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            await self.DesactivarItem(id)
          }
        })
    },
  },
  mounted() {
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0]
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
