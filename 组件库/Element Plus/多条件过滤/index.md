有时候需要在前端对列表数据进行筛选

```vue
<template>
  <div class="overflow-auto">
    <div class="space-y-5">
      <card title="筛选条件">
        <el-form :model="form" label-width="120px" size="small">
          <el-form-item label="政策类型">
            <el-radio-group v-model="form.policy">
              <el-radio v-for="item in policies" :key="item" :label="item" border>{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="行业区域">
            <el-radio-group v-model="form.profession">
              <el-radio v-for="item in professions" :key="item" :label="item" border>{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="人才/组织类型">
            <el-radio-group v-model="form.organization">
              <el-radio v-for="item in organizations" :key="item" :label="item" border>{{ item }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </card>

      <card title="政策" class="content">
        <el-table v-adaptive :data="tableData" style="width: 100%;" height="600px">
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="{ row, column }">
              <div v-if="item.label === '操作'">
                <el-button type="text" @click="openDialog(row.content)">查看详情</el-button>
                <el-button v-if="row.address" type="text" @click="handle(row.address)">立即办理</el-button>
              </div>
              <span v-else>{{ row[column.property] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>

    <el-dialog
      title="政策内容"
      :visible.sync="dialogVisible"
      width="50%"
      class="article"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>{{ content }}</div>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/views/sub-page/components/Card'
import { policies } from './data'

export default {
  components: {
    Card
  },
  data() {
    return {
      form: {
        policy: '不限',
        profession: '不限',
        organization: '不限'
      },
      policies: ['不限', '人才服务类', '创新创业类', '补贴类', '人才认定类', '奖励类', '企业服务类'],
      professions: ['不限', '体育', '文化', '法律', '卫生', '教育', '金融', '时尚', '科创', '工业商业', '通用', '河套深港科技创新合作区'],
      organizations: ['不限', '初创企业', '福田英才', '港澳台籍青年', '高层次人才', '工业商业人才', '公职人才', '海外人才', '人才载体',
        '金融人才', '科研人才', '企业经营管理人才', '技能人才', '人力资源服务机构', '商协会', '人才服务联盟', '上市公司', '社会事业人才',
        '时尚人才', '网络营销者', '应届毕业生'],
      columns: [
        { prop: 'title', label: '政策标题' },
        { prop: 'policy', label: '政策类型' },
        { prop: 'profession', label: '行业/区域' },
        { prop: 'organization', label: '人才/组织' },
        { label: '操作', width: '200px' }
      ],
      tableData: policies,
      dialogVisible: false,
      content: ''
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        const { policy, profession, organization } = this.form
        const isEmpty = policy === '不限' && profession === '不限' && organization === '不限'
        // 如果查询条件都为不限，返回全部；否则按条件筛选
        if (isEmpty) {
          this.tableData = policies
        } else {
          // 拿到值为非不限的筛选条件
          const tempFilter = {}
          Object.keys(this.form).forEach(key => {
            if (this.form[key] !== '不限') tempFilter[key] = this.form[key]
          })
          // 利用数组 filter 方法
          this.tableData = policies.filter(item => {
            // 方式一
            /*let flag = false
            // 筛选条件是交集关系，如 form 为 { policies: '人才服务类', professions: '体育' }
            // 表示筛选满足条件：“policies 为人才服务类且 professions 为体育”的数据项
            for (const key in tempFilter) {
              if (item[key].includes(tempFilter[key])) {
                // 只有满足所有条件，flag 最终才为 true
                flag = true
              } else {
                // 只要不满足其中一个条件，该项数据就可以被过滤掉
                flag = false
                break
              }
            }
            return flag*/
            
            // 方式二
            let flag = true
            for (const key in tempFilter) {
              flag = item[key].includes(tempFilter[key]) && flag
            }
            return flag
          })
        }
      }
    }
  },
  methods: {
    openDialog(content) {
      this.dialogVisible = true
      this.content = content
    },
    handle(address) {
      const a = document.createElement('a')
      a.href = address
      a.click()
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  height: calc(100vh - 425px);
}

::v-deep {
  .el-radio {
    margin-top: 10px;
  }

  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }

  .el-form-item__label {
    margin-top: 10px;
  }

  .el-radio__input {
    display: none;
  }

  .el-radio__label {
    padding-left: 0;
  }

  .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
}

.article {
  margin-bottom: 10px;
  font-size: 14px;
  text-indent: 2em;
  line-height: 32px;
}
</style>
```
