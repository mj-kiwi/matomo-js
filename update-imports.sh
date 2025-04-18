#!/bin/bash


cd tests/matomo-client/modules
for file in *.spec.ts; do
  relative_import=$(grep -o "from \"../../src/modules/[^\"]*\"" "$file" | head -1)
  if [ ! -z "$relative_import" ]; then
    module_name=$(grep -o "import { [A-Za-z]*Module } from" "$file" | sed -E "s/import { ([A-Za-z]*)Module } from.*/\1/")
    if [ ! -z "$module_name" ]; then
      echo "Updating $file: $module_name"
      sed -i '' "s|import { ${module_name}Module } from \"../../src/modules/.*\";|import { ${module_name}Module, CoreReportingClient } from \"@mj-kiwi/matomo-client\";|" "$file"
      sed -i '' "/import { CoreReportingClient } from \"@mj-kiwi\/matomo-client\";/d" "$file"
    fi
  fi
done
