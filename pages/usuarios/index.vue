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
                      <th class="py-0 px-1">DOCUMENTO</th>
                      <th class="py-0 px-1">NOMBRE</th>
                      <th class="py-0 px-1">TELÉFONO</th>
                      <th class="py-0 px-1">DIRECCIÓN</th>
                      <th class="py-0 px-1">CIUDAD</th>
                      <th class="py-0 px-1">USUARIO</th>
                      <th class="py-0 px-1">CORREO</th>
                      <th class="py-0 px-1">ROL</th>
                      <th class="py-0 px-1">ACCIONES</th>
                      <th class="py-0 px-1">ESTADO</th>
                    </thead>
                    <tbody>
                      <tr v-for="(m, i) in list">
                        <td class="py-0 px-1">{{ m.id_tipo_documento }}-{{ m.documento }}</td>
                        <td class="py-0 px-1">{{ m.nombre }}</td>
                        <td class="py-0 px-1">{{ m.telefono }}</td>
                        <td class="py-0 px-1">{{ m.direccion }}</td>
                        <td class="py-0 px-1">{{ m.ciudad }}</td>
                        <td class="py-0 px-1">{{ m.username }}</td>
                        <td class="py-0 px-1">{{ m.email }}</td>
                        <td class="py-0 px-1">{{ m.rol }}</td>
                        <td class="py-0 px-1">
                          <div class="btn-group">
                            <nuxtLink :to="url_editar + m.id" class="btn btn-secondary btn-sm">
                              <i class="fas fa-pen"></i>
                            </nuxtLink>
                            <template v-if="m.estado == '1'">
                              <button type="button" @click="Desactivar(m.id)" class="btn btn-danger btn-sm">
                                <i class="fas fa-trash"></i>
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
      apiUrl: 'users',
      page: 'Usuario',
      modulo: 'Usuarios',
      url_nuevo: '/usuarios/nuevo',
      url_editar: '/usuarios/',
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
