import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    CardModule,
    InputTextareaModule,
    PanelModule,
    PasswordModule,
    InputSwitchModule,
    TooltipModule,
    ChipModule,
    BadgeModule,
    MenubarModule,
    SelectButtonModule,
    CalendarModule,
    FieldsetModule,
    MessagesModule,
    MessageModule,
    DividerModule,
    InputNumberModule,
  ]
})
export class LibPrimeNGModule { }
