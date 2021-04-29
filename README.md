# Automatyzacja do projektu o roślinach miododajnych

---

Aby zautomatyzować przetwarzanie obrazów potrzebujesz
[`deno`]("https://deno.land/")

1. Pobierz obrazy odpalając skrypt `download.ts`

```bash
deno run --allow-all download.ts
```

2. Zmień rozmiar pobranych obrazów do 300x300px odpalając skrypt `resize.ts`

```bash
deno run --allow-all resize.ts
```

3. Przekonwertuj obrazki na znaczniki `img` odpalając skrypt `tags.ts`

```bash
deno run --allow-all tags.ts
```

Obrazki są gotowe!
