import React from 'react'

import { Header } from '../core/header'
import { Footer } from '../core/footer'
import { SiteName } from '../core/site-name'

export class SearchContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header>
          <SiteName />
        </Header>
        <main className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis
          dui vitae nibh tincidunt, feugiat lacinia augue laoreet. Duis
          hendrerit tortor eu volutpat posuere. Sed suscipit mollis quam in
          sollicitudin. Proin nulla lorem, lacinia et hendrerit ut, condimentum
          vel nibh. Nullam vulputate, urna lacinia pretium maximus, diam erat
          sodales nisl, sit amet porttitor velit sem vel diam. Pellentesque ac
          rutrum leo, a semper erat. In ac venenatis eros. Nam vitae eros ac leo
          maximus finibus. Sed rutrum ante eu est rhoncus porttitor. Quisque
          eget sem auctor, pulvinar felis sed, sollicitudin libero. Vivamus id
          lacinia tellus. Quisque varius iaculis metus, eu pulvinar ex ornare
          id. Curabitur sem felis, tincidunt a iaculis id, lobortis at augue.
          Cras sollicitudin mattis sem, eget elementum nibh consequat sit amet.
          Nullam condimentum, tortor nec elementum ultricies, urna neque
          condimentum mauris, ac sollicitudin est orci nec leo. Vivamus id
          porttitor massa. Maecenas lacus metus, eleifend et blandit nec,
          blandit mollis mi. Sed rutrum mauris id dolor rutrum, vitae sodales
          sapien dapibus. Morbi ac magna ultricies urna blandit consectetur ut
          sed mi. Vestibulum lorem nisi, efficitur vitae velit eu, sagittis
          tincidunt nunc. Aenean enim leo, consequat sit amet quam posuere,
          maximus lobortis nulla. Vestibulum suscipit urna ante, rhoncus
          tincidunt neque dapibus eget. Maecenas consectetur pulvinar justo, nec
          pulvinar leo rhoncus eget. Nulla erat dolor, ultricies at elit at,
          fringilla posuere est. Vestibulum ligula leo, consequat in
          pellentesque ac, pellentesque eu justo. Pellentesque non condimentum
          elit. Curabitur nec lorem orci. Nam ullamcorper vehicula justo, vel
          scelerisque erat congue eget. Praesent eu venenatis purus. Aliquam
          vitae tempus lorem. Etiam luctus lectus non massa varius, sed pulvinar
          ipsum ultricies. Aliquam erat volutpat. Duis justo mi, facilisis ac
          feugiat viverra, commodo eu lorem. Nullam pretium blandit egestas.
          Donec nec risus non enim convallis elementum. Phasellus eu ipsum
          turpis. Nam at ante id lectus convallis congue. Sed pharetra semper
          orci a tincidunt. Etiam ac leo eros.
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}
