# Михалыч — web

```powershell
npm install
npm run dev
```

Static export:

```powershell
$env:MIHALYCH_STATIC_EXPORT = '1'
npm run build
Remove-Item Env:MIHALYCH_STATIC_EXPORT
```

Output: `out/`
