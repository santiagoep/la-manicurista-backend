# Pull Request Template (borrar esta sección después de completar el PR)

Usar esta plantilla para documentar los PRs. de forma que se muestre contexto y así enriquecer el proceso de code review; llenar las siguientes secciones:

## Bitácora de análisis

En este lugar se incluyen los resultados de la conversación e investigación hechas al realizar el análisis preliminar antes del desarrollo, se debe dar la idea general de lo que implica el cambio.

Esta sección debe responder preguntas como: ¿ qué estaba mal en el código anterior ? (si aplica) ¿ cómo se espera que el nuevo código mejore lo que hay actualmente o implemente la funcionalidad deseada ?

Ejemplo:

- Identificamos la necesidad de suavizar/mejorar las animaciones entre lineales
- Al discutir con miembros del equipo tal y tal identificamos que las animaciones generan muchas operaciones necesarias en tal.js y pascual.js en las lineas 35 y 52.
- El código en este pr apunta a mejorar tanto el performance de la sección como la legibilidad del código de las animaciones de lineales haciendo wrap de estas animaciones en una abstracción aparte consignada en el nuevo archivo NewAndAwesomeAnimations.js

## Bitácora de desarrollo

Acá se explica el impacto del código que se escribió y como se logra el resultado deseado y dictado por el ticket.
esto se logra escribiendo la "bitácora" o "historia" COMPLETA del desarrollo; Significando: los problemas encontrados, los cambios de lo pensado inicialmente y las razones de estos.

En general incluir todo lo necesario para que una persona con poco o nada de contexto pueda entender el PR y dar un review informado acerca de los cambios

ejemplo:

- Refactor de la forma como se hacen mocks en el estado de la aplicación incluyendo un nuevo método llamado getMockedState al objeto App como se ve en la linea 33 de App.js
- El nuevo método se desarrollo siguiendo el patron fluent interface (https://en.wikipedia.org/wiki/Fluent_interface) para permitir method chaining.
- Inicialmente se hablo de implementar la solución con otro patrón pero se decidió por otro camino por x o y razones.
- Todo código que llamaba el anterior método tuvo que ser modificado para llamar el nuevo método de la forma correcta.

## Comportamiento Antes (borrar esta sección en caso de que no sea bug/issue)

Aquí se postearán los videos/screenshots referentes al comportamiento antes del fix aplicado. Esto permitirá a los usuarios que revisan los PR, visualizar con mayor detalle el bug/issue que se esta corrigiendo.

## Comportamiento Después (borrar esta sección en caso de que no sea bug/issue)

Aquí se postearán los videos/screenshots referentes al comportamiento después del fix aplicado. Esto permitirá a los usuarios que revisan los PR, visualizar con mayor detalle el bug/issue corregido.
