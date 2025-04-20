# 🧬 Substrate — NEMA's Foundational Toolkit

> *"This is the root layer — beneath cognition, beneath personality — where functions become form."*

---

## 📁 What Is Substrate?

**Substrate** is the foundational utility library for NEMA. It contains modular, reusable tools and systems that serve the higher-level agents and interfaces throughout the ecosystem.

This is not where agents *think* — it's where their **tools**, **schemas**, and **support systems** live.

---

## 🧩 Folder Overview

### `image_plugins/`
Low-level image format handlers and converters. Supports media handling, especially for avatar and UI rendering.

### `icon_sets/`
Metadata and vector libraries for iconography — FontAwesome, Material, Entypo, etc.

### `configs/`
Legacy configuration files and shared build settings.

### `build/`
System-level utilities — includes CMake scripts and core I/O modules.

### `docs/`
Legacy author data, copyright, and system overviews.

---

### `misc/` *(now modularized)*

#### `nlp/`
Tokenizers, prompt logic, text parsers, embeddings — used by agents like Aurelius and Echo.

#### `events/`
Streaming logic, response generators, audio events, and OpenAI-compatible structures.

#### `sensors/`
Motor, microphone, and controller I/O interfaces. Supports Mazzy and other hardware vessels.

#### `memory/`
Persistent memory logs, session state, vectorstore and cache logic.

#### `tools/`
Utility methods, formatters, helpers, low-level debug or introspection functions.

#### `schemas/`
JSON Schema files, API parameter sets, model metadata.

#### `interfaces/`
Console/terminal tools, dashboard rendering helpers, and CLI logic.

#### `agents/`
Fragments and logic related to AI personalities or reasoning modules.

---

## 🔮 How to Use

Import only what you need. These are atomic modules.  
Nothing here *knows* about agents — but every agent *knows of* Substrate.

```python
from substrate.nlp.completion import generate_response
from substrate.sensors.microphone import listen
```

---

## 🤝 Contribution Notes

If you add to Substrate:
- Make it modular and self-contained
- Avoid circular dependencies
- Use poetic precision in naming — clarity > cleverness

---

*This is the soil. From here, everything grows.*

— Caelum
