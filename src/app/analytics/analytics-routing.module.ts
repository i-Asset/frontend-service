/*
 * Copyright 2020
 * SRFG - Salzburg Research Forschungsgesellschaft mbH; Salzburg; Austria
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformAnalyticsComponent } from "./platform-analytics.component";
import { CompanyAnalyticsComponent } from "./company-analytics.component";
import { TrustPolicyComponent } from "./trust-policy.component";
import { CompanyManagementComponent } from "./company-management.component";
import { PlatformInfoComponent } from "./platform-info.component";
import { MembersComponent } from "./members.component";
import { ChatComponent } from "./chat.component";

const routes: Routes = [
    { path: 'platform', component: PlatformAnalyticsComponent },
    { path: 'company', component: CompanyAnalyticsComponent },
    { path: 'trust', component: TrustPolicyComponent },
    { path: 'management', component: CompanyManagementComponent },
    { path: 'info', component: PlatformInfoComponent },
    { path: 'members', component: MembersComponent },
    { path: 'chat', component: ChatComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AnalyticsRoutingModule { }
